import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { routes } from "../../../routes";
import { useEffect, useState } from "react";
import SejourType from "../../../types/sejour.type";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";

type FormData = {
  description: string;
  prescription: {
    date: string;
  };
  medecament: {
    medicament: string;
    posologie: string;
  }[];
};
export default function Avis() {
  const { sejourId } = useLocalSearchParams();
  const [sejour, setSejour] = useState<SejourType>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: "",
      prescription: {
        date: "",
      },
      medecament: [{ medicament: "", posologie: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medecament",
  });
  const getSejour = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Token not found!");
      }
      const response = await fetch(`${routes}sejour/${sejourId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      setSejour(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Token not found!");
      }
      const response = await fetch(`${routes}avis/${sejourId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSejour();
  }, []);
  return (
    <View style={styles.container}>
      {sejour ? (
        <View>
          <Text style={styles.motif}>Motif du Sejour:</Text>
          <Text style={styles.sejourMotif}>{sejour.motif}</Text>
        </View>
      ) : (
        <Text>"Loading...!!!!"</Text>
      )}
      <Text style={styles.titleAvis}>Prescrire un avis</Text>
      <Controller
        control={control}
        name="description"
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            placeholder="Description de l'avis"
          />
        )}
      />
      {errors.description && <Text>Ce champ est requis.</Text>}

      <Controller
        control={control}
        name="prescription.date"
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            placeholder="Date de prescription"
          />
        )}
      />
      {errors.prescription?.date && <Text>La date est requise.</Text>}

      {fields.map((field, index) => (
        <View key={field.id} style={styles.prescriptionBlock}>
          <Controller
            control={control}
            name={`medecament.${index}.medicament`}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                style={styles.input}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                placeholder="Médicament"
              />
            )}
          />
          <Controller
            control={control}
            name={`medecament.${index}.posologie`}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                style={styles.input}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                placeholder="Posologie"
              />
            )}
          />
          <Button title="Supprimer" onPress={() => remove(index)} />
        </View>
      ))}

      <View style={styles.addMedicament}>
        <Button
          title="Ajouter un médicament"
          onPress={() => append({ medicament: "", posologie: "" })}
        />
      </View>
      <Button title="Soumettre" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71A3D0",
    padding: 20,
  },
  motif: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sejourMotif: {
    fontSize: 16,
  },
  titleAvis: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    marginTop: 5,
  },
  prescriptionBlock: {
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  addMedicament: {
    marginBottom: 20,
  },
});
