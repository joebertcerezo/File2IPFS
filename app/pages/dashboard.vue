<template>
  <section>
    <!-- Configuration Panel -->
    <div
      class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl"
    >
      <!-- Upload Section -->
      <div
        class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
      >
        <!-- Status Indicator -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <div
              class="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg shadow-green-400/50"
            ></div>
            <h2 class="text-xl font-semibold text-white">Upload</h2>
          </div>
          <div
            v-if="userInfo?.userInformation?.email"
            class="text-sm text-slate-300"
          >
            {{ userInfo.userInformation.email }}
          </div>
        </div>

        <!-- Drop Zone -->
        <div
          ref="jsonDropZone"
          :class="[
            'relative border-2 border-dashed rounded-2xl px-10 py-7 text-center transition-all duration-300',
            isOverDropZone
              ? 'border-purple-400 bg-purple-400/10 scale-105'
              : 'border-slate-400 hover:border-purple-400 hover:bg-white/5',
          ]"
        >
          <div class="flex flex-col items-center space-y-4">
            <!-- Upload Icon -->
            <div
              :class="[
                'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300',
                isOverDropZone
                  ? 'bg-purple-400/20 text-purple-400'
                  : 'bg-slate-600/50 text-slate-400',
              ]"
            >
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            <!-- Upload Text -->
            <div>
              <h3 class="text-lg font-medium text-white mb-2">
                {{
                  isOverDropZone
                    ? "Drop your JSON file here!"
                    : "Upload JSON File"
                }}
              </h3>
              <p class="text-slate-400 mb-4">
                Drag and drop your JSON file or click to browse
              </p>
            </div>

            <!-- File Input -->
            <Input
              @change="handleFileSelect"
              type="file"
              accept="application/json,.json"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <!-- Selected File Display -->
        <div
          v-if="selectedFile"
          class="mt-6 p-4 bg-white/5 rounded-xl border border-white/10"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-white font-medium">{{ selectedFile.name }}</p>
                <p class="text-slate-400 text-sm">
                  {{ formatFileSize(selectedFile.size) }}
                </p>
              </div>
            </div>
            <Button
              @click="clearFile"
              variant="ghost"
              size="sm"
              class="text-slate-400 hover:text-white"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        </div>

        <!-- Upload Button -->
        <div v-if="selectedFile" class="mt-6 flex justify-center">
          <Button
            @click="upload"
            :disabled="pending"
            class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-medium shadow-lg shadow-purple-500/25"
          >
            <svg
              v-if="pending"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ pending ? "Uploading..." : "Upload to IPFS" }}
          </Button>
        </div>

        <!-- Success/Error Messages -->
        <div
          v-if="data && !error"
          class="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
        >
          <div class="flex items-start space-x-3">
            <div
              class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            >
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 class="text-green-400 font-medium mb-2">
                Upload Successful!
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex space-x-2">
                  <a
                    :href="ipfsData?.ipfsUrl"
                    target="_blank"
                    class="text-purple-400 hover:text-purple-300 underline"
                  >
                    View on IPFS
                  </a>
                  <span class="text-slate-500">|</span>
                  <a
                    :href="ipfsData?.gatewayUrl"
                    target="_blank"
                    class="text-purple-400 hover:text-purple-300 underline"
                  >
                    Gateway URL
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="error"
          class="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <h4 class="text-red-400 font-medium">Upload Failed</h4>
              <p class="text-slate-300 text-sm mt-1">
                {{ error.message || "An error occurred during upload" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useJwt } from "@vueuse/integrations/useJwt";
import { useDropZone } from "@vueuse/core";

const cookie = useCookie("jwt").value;
const gatewayUrl = useCookie("gatewayUrl").value;
const selectedFile = ref<File | null>(null);
const jsonDropZone = useTemplateRef<HTMLElement>("jsonDropZone");
const formData = new FormData();

const { isOverDropZone } = useDropZone(jsonDropZone, onDrop);

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

const { header, payload } = useJwt(cookie as string);

const ipfsData = ref<PinataUploadResponse>();

const userInfo = computed(() => payload.value as UserInformation);

const { data, pending, error, execute } = await useFetch<PinataUploadData>(
  () => "/api/file",
  {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
    immediate: false,
  }
);

const upload = async () => {
  if (!selectedFile.value) {
    console.error("No file selected");
    return;
  }
  await execute();
  if (!error.value) {
    if (data.value) {
      ipfsData.value = {
        data: data.value,
        ipfsUrl: `https://ipfs.io/ipfs/${data.value.IpfsHash}`,
        gatewayUrl: `https://${gatewayUrl}/ipfs/${data.value.IpfsHash}`,
      };
    }
  }
};

function onDrop(files: File[] | null) {
  if (files) {
    if (files[0]?.type !== "application/json") {
      alert("JSON file only");
      return;
    }
    selectedFile.value = files[0];
    formData.append("file", selectedFile.value);
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    if (target.files[0].type !== "application/json") {
      alert("JSON files only");
      return;
    }
    selectedFile.value = target.files[0];
    formData.append("file", selectedFile.value);
  }
};

const clearFile = () => {
  selectedFile.value = null;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
</script>
