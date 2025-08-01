<template>
  <section>
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
      <!-- Upload Section -->
      <!-- Status Indicator -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <div class="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg shadow-green-400/50"></div>
          <h2 class="text-xl font-semibold text-white">Upload</h2>
        </div>
        <div v-if="userInfo?.userInformation?.email" class="text-sm text-slate-300">
          {{ userInfo.userInformation.email }}
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <FileUpload />
        <div class="flex flex-row items-center gap-2">
          <span class="border-1 border-slate-200 w-full mx-3"></span>
          <p>
            OR
          </p>
          <span class="border-1 border-slate-200 w-full mx-3"></span>
        </div>
        <ImageUpload />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useJwt } from "@vueuse/integrations/useJwt";

const cookie = useCookie("jwt").value;

interface UserInformation {
  userInformation: {
    id: string;
    email: string;
  };
}

interface PinataUploadData {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  ID: string;
  Name: string;
  NumberOfFiles: number;
  MimeType: string;
  GroupId: string | null;
  Keyvalues: Record<string, any> | null;
}

interface PinataUploadResponse {
  data: PinataUploadData;
  ipfsUrl: string;
  gatewayUrl: string;
}

const { payload } = useJwt(cookie as string);

const userInfo = computed(() => payload.value as UserInformation);

</script>
