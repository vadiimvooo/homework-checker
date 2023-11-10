import {adminSupabseCLient} from "@/lib/supabaseClient";

export function getUsers() {
    return adminSupabseCLient.auth.admin.listUsers()
        .then((response) => (
            response.data.users
        ));
}

export function getUser(id: string) {
    return adminSupabseCLient.auth.admin.getUserById(id)
        .then((response) => response.data.user)
}