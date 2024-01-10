<template>
    <div class="flex flex-col place-items-center">
        <div class="text-3xl font-thin pt-4">Ajouter un nouvel établissement</div>
        {{ form }}
        <div class="flex flex-col w-1/4 pt-4 space-y-4">
            <div class="flex flex-col place-items-start w-full space-y-1">
                <span class=" font-thin">Nom de l'établissement</span>
                <UInput v-model="form.name" class="w-full" size="lg" placeholder="Nom de l'école ex : IPnet" />
            </div>
            <div class="flex flex-col place-items-start w-full space-y-1">
                <span class=" font-thin">Numéro de téléphone</span>
                <UInput v-model="form.phoneNumber" class="w-full" size="lg" placeholder="ex: 90 91 36 61" />
            </div>
            <div class="flex flex-col place-items-start w-full space-y-1">
                <span class=" font-thin">Addresse</span>
                <UInput v-model="form.address" class="w-full" size="lg" placeholder="ex: Rue Edem Kodjo" />
            </div>
            <div class="flex flex-col place-items-start w-full space-y-1">
                <span class=" font-thin">Email</span>
                <UInput v-model="form.emailAddress" class="w-full" size="lg" placeholder="ex : ipnet@email.tg" />
            </div>
            <div>
                <UButton variant="soft" @click="() => isOpen = true">Ajouter une formation</UButton>
            </div>

            <div v-for="(f,i) in form.formations" :key="f.name"
                class="flex space-y-2 relative flex-col py-2 place-items-start bg-slate-50 p-2 rounded-lg">
                <span class="">{{ f.name }}</span>
                <div class="divide divide-red-200 divide-solid"></div>
                <span class="text-sm">{{ f.description }}</span>
                <UButton @click="deleteDiploma(i)" color="red" class="absolute right-5 top-0 ">
                    supprimer
                </UButton>
            </div>
            <div class="pt-4">
                <UButton @click="saveForm" class="w-full" block size="lg">Enregistrer</UButton>
            </div>



        </div>
        <UModal v-model="isOpen">

            <div class="p-4 space-y-4">
                <div>Ajouter une formation</div>
                <div class="flex flex-col place-items-start w-full space-y-1">
                    <span class=" font-thin">Nom de la formation</span>
                    <UInput v-model="formation.name" class="w-full" size="lg" placeholder=" Cyber sécuritéex " />
                </div>
                <div class="flex flex-col place-items-start w-full space-y-1">
                    <span class=" font-thin">Email</span>
                    <UTextarea v-model="formation.description" class="w-full" size="lg" placeholder="Description" />
                </div>
                <div class="pt-4">
                    <UButton @click="saveFormation" class="w-full" block size="lg">Enregistrer</UButton>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
const STORAGE_KEY = "INSTITUTIONS_KEY";
import { type Formation, type Institution } from '~/models/interfaces';
const isOpen = ref(false)
const form = ref<Partial<Institution>>({ formations: [] })
const formation = reactive<Partial<Formation>>({})

function saveFormation() {
    if (formation.name === null || formation.name?.length === 0) {
        return;
    }
    form.value.formations?.push({ name: formation.name ?? "", description: formation.description ?? "" })
    formation.name = undefined
    formation.description = undefined
    isOpen.value = false;
}


function saveForm() {
    const data = useStorage<Institution[]>(STORAGE_KEY, []
    )
    data.value.push({
        id: data.value.length + 1,
        address: form.value.address ?? "",
        name: form.value.name ?? "",
        emailAddress: form.value.emailAddress ?? "",
        formations: form.value.formations ?? [],
        phoneNumber: form.value.phoneNumber ?? ""
    })
    form.value = {}
    navigateTo({name:"index"})
}

function deleteDiploma(place:number){
    console.log(place)
    form.value.formations?.splice(place,1)
}
</script>

<style scoped></style>