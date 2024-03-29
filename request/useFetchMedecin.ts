import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Medecin } from "../types/medecin.type";
import { router } from "expo-router";


export default function useFetchUserProfile() {
    const [user, setUser] = useState<Medecin>();
    // const router = useRouter();
    // const pathName = usePathname()
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = AsyncStorage.getItem("accessToken");
                if (!token) {
                    throw new Error("No access token found in cookies. User is not authenticated.");
                }
                const response = await fetch("http://localhost:8000/auth/medecin/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Unable to fetch user profile. Server responded with status: ${response.status}`);
                }
                setUser(await response.json());
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        if (!user) {
            fetchUserProfile();
        }
    }, [user, router]);
    return user;
}