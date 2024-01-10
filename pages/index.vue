<template>
    <div class="space-y-4  overflow-y-hidden">
        <div class="h-4"></div>
        <div class="flex flex-col   place-items-center space-y-4">
            <div class="flex place-items-end">
                <div class="text-5xl">e</div> <span class="pl-1">du</span> <span class=" font-bold text-purple-400">wiki</span>
            </div>
         
            <div class="font-thin">edu wiki</div>
            <UInput v-model="searchKey" :ui="{ icon: { trailing: { pointer: '' } } }" placeholder="Faire une recherche" size="lg"
                class="w-2/6 rounded-xl">
                <!-- <template #trailing>
                    <UButton color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false" />
                </template> -->
            </UInput>
        </div>
        <div class="flex place-items-center flex-col h-full">
            <div class="p- flex flex-col place-items-center" v-if="schools.length==0 && searchKey.length>0">
            <div class="text-4xl">Oups</div>
            <div class="font-thin">Aucune donnée trouvée</div>
            </div>
            <div class="p-4 h-full place-content-center  flex flex-col place-items-center" v-if="schools.length==0 && searchKey.length===0">
            <div class="text-sm">Pas d'établissement actuellement</div>
            <UButton variant="ghost" class="text-sm">ajoutez </UButton>
            <!-- <div class="font-thin">Aucune donnée trouvée</div> -->
            </div>
            <div class="flex place-items-center flex-col overflow-y-auto space-y-6 w-3/5 p-4 ">
                <div class="w-4/6 " v-for="i in schools" :key="i.name">
                    <div @click="toggledetails(i.id)" class="flex  p-4 rounded-lg border">
                        <div class="flex  w-full ">
                            <div class="flex flex-col space-y-2">
                                <span class="text-xl font-bold">
                                    {{ i.name }}
                                </span>
                                <div class="flex flex-col font-thin">
                                    <span>
                                        {{ i.phoneNumber }}
                                    </span>
                                    <span>
                                        {{ i.emailAddress }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="place-items-center place-content-center flex flex-col bg-primary/10  p-2 rounded-lg">
                            <span class="text-2xl font-bold text-primary">
                                {{ i.formations.length }}
                            </span>
                            <span class="text-2xl font-thin text-primary">
                                Formations
                            </span>
                        </div>
                    </div>

                    <div v-if="selectedSchool===i.id" class="px-4 py-4  bg-slate-50/60 rounded-b-lg">
                        <div>Formations disponibles</div>
                        <div v-for="f in i.formations" :key="f.name" class="flex space-y-2 flex-col py-2 place-items-start">
                            <span class="bg-primary/20 px-4 rounded-lg py-2">{{ f.name }}</span>
                            <spa class="text-sm">{{ f.description }}</spa>
                        </div>
                    </div>
                </div>

                <!-- <UAccordion :items="schools"></UAccordion> -->
            </div>
        </div>
<div class="fixed bottom-0 flex w-full place-content-center">
   <div class="p-2">2024 edu wiki Ⓒ </div>
</div>
    </div>
</template>

<script setup lang="ts">
import  { type Institution } from '~/models/interfaces';
import { useStorage } from '@vueuse/core'
const STORAGE_KEY="INSTITUTIONS_KEY";
const searchKey = ref("")
const schools = ref<Institution[]>(
       [ ]
)
whenever(searchKey,()=>{
if(searchKey.value.length===0){
schools.value= institutions.value;
}else{
    searchInstitutions(searchKey.value)
}
})
const institutions = useStorage<Institution[]>(STORAGE_KEY,[]
// [{
    //     "id": 0,
    //     "name": "Institution Name 1",
    //     "address": "123 Main Street, City, Country",
    //     "phoneNumber": "123-456-7890",
    //     "emailAddress": "info@institution1.com",
    //     "formations": [
    //         {
    //             "name": "Diploma 1",
    //             "description": "Description of Diploma 1"
    //         },
    //         {
    //             "name": "Diploma 2",
    //             "description": "Description of Diploma 2"
    //         },
    //         {
    //             "name": "Diploma 3",
    //             "description": "Description of Diploma 3"
    //         }
    //     ]
    // },
    // {
    //     "id": 1,
    //     "name": "Institution Name 2",
    //     "address": "456 Oak Street, City, Country",
    //     "phoneNumber": "987-654-3210",
    //     "emailAddress": "info@institution2.com",
    //     "formations": [
    //         {
    //             "name": "Diploma A",
    //             "description": "Description of Diploma A"
    //         },
    //         {
    //             "name": "Diploma B",
    //             "description": "Description of Diploma B"
    //         }
    //     ]}]
        )

        schools.value = institutions.value;
const selectedSchool = ref()
function toggledetails(params:number) {
    if(selectedSchool.value==params){
        selectedSchool.value = null;
    }else{
        selectedSchool.value=params
    }
}

function searchInstitutions(searchTerm: string) {
  const filteredInstitutions: Institution[] = [];

  institutions.value.forEach((institution) => {
    // Case-insensitive search for institution name
    if (institution.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      filteredInstitutions.push(institution);
    } else {
      // Case-insensitive search for formation name within the institution
      const matchingFormation = institution.formations.filter((formation) =>
        formation.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // If any matching formation are found, add the institution to the result
      if (matchingFormation.length > 0) {
        filteredInstitutions.push({
          ...institution,
          formations: matchingFormation,
        });
      }
    }
  });

  schools.value= filteredInstitutions;
}

// const schools:Institution[] = [
//     {
//         "id": 0,
//         "name": "Institution Name 1",
//         "address": "123 Main Street, City, Country",
//         "phoneNumber": "123-456-7890",
//         "emailAddress": "info@institution1.com",
//         "formations": [
//             {
//                 "name": "Diploma 1",
//                 "description": "Description of Diploma 1"
//             },
//             {
//                 "name": "Diploma 2",
//                 "description": "Description of Diploma 2"
//             },
//             {
//                 "name": "Diploma 3",
//                 "description": "Description of Diploma 3"
//             }
//         ]
//     },
//     {
//         "id": 1,
//         "name": "Institution Name 2",
//         "address": "456 Oak Street, City, Country",
//         "phoneNumber": "987-654-3210",
//         "emailAddress": "info@institution2.com",
//         "formations": [
//             {
//                 "name": "Diploma A",
//                 "description": "Description of Diploma A"
//             },
//             {
//                 "name": "Diploma B",
//                 "description": "Description of Diploma B"
//             }
//         ]
//     }


    
//     // Add more institutions as needed
// ]
</script>

<style scoped></style>