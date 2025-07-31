<template>
  <section>
    <div
      class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl"
    >
      <div class="flex items-center mb-6">
        <div class="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
        <h2 class="text-lg font-semibold text-white">Configuration</h2>

        {{ data || "bosn" }}
        <Button @click="upload">execute</Button>
        <Input @change="handleFileSelect" type="file" />
        <div v-if="selectedFile">
          {{ selectedFile.name }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useJwt } from "@vueuse/integrations/useJwt";

const cookie = useCookie("jwt").value;
const selectedFile = ref();
const formData = new FormData();

interface UserInformation {
  userInformation: {
    id: string;
    email: string;
  };
}

const { header, payload } = useJwt(cookie as string);

const userInfo = computed(() => payload.value as UserInformation);

const { data, pending, error, execute } = await useFetch(() => "/api/file", {
  method: "POST",
  body: formData,
  headers: {
    Authorization: `Bearer ${cookie}`,
  },
  immediate: false,
});

const upload = async () => {
  await execute();
  if (!error.value) {
    console.log(data.value);
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
    // const file = new File(selectedFile.value, selectedFile.value.name);
    formData.append("file", selectedFile.value);
  }
};
</script>
