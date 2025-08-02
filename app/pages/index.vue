<template>
  <section>
    <!-- Configuration Panel -->
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
      <div class="flex items-center mb-6">
        <div class="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
        <h2 class="text-lg font-semibold text-white">Configuration</h2>
      </div>

      <div class="space-y-4">
        <!-- JWT Input -->
        <div class="group">
          <Label class="text-gray-200 text-sm font-medium flex items-center mb-2">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd" />
            </svg>
            JWT Token
          </Label>
          <Input v-model="jwt" type="password" placeholder="Enter your JWT token..."
            class="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 transition-all duration-300"
            :class="{
              'border-green-400 ring-green-400/50': jwt && isValidJWT,
            }" />
          <div v-if="jwt && !isValidJWT" class="text-red-400 text-xs mt-1 flex items-center">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd" />
            </svg>
            Invalid JWT format
          </div>
        </div>

        <!-- Gateway Input -->
        <div class="group">
          <Label class="text-gray-200 text-sm font-medium flex items-center mb-2">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                clip-rule="evenodd" />
            </svg>
            IPFS Gateway
          </Label>
          <Input v-model="gateway" type="url" placeholder="example-gateway.mypinata.cloud"
            class="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 transition-all duration-300"
            :class="{
              'border-green-400 ring-green-400/50': gateway && isValidURL,
            }" />
          <div v-if="gateway && !isValidURL" class="text-red-400 text-xs mt-1 flex items-center">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd" />
            </svg>
            Please enter a valid URL
          </div>
        </div>
      </div>

      <!-- Status indicator -->
      <div class="mt-6 flex items-center justify-between">
        <div class="flex items-center">
          <div :class="configStatus.color" class="w-2 h-2 rounded-full mr-2"></div>
          <span class="text-sm text-gray-300">{{ configStatus.text }}</span>
        </div>
        <Button :disabled="!isConfigured"
          class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          @click="saveConfig">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd" />
          </svg>
          {{ isConfigured ? "Configuration Ready" : "Configure" }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useJwt } from "@vueuse/integrations/useJwt";
import { useCookies } from "@vueuse/integrations/useCookies";

// SEO Meta tags for the home page
useSeoMeta({
  title: 'File2IPFS - Upload Files to IPFS with Pinata Integration',
  ogTitle: 'File2IPFS - Upload Files to IPFS with Pinata Integration',
  description: 'Easily upload NFT images and metadata files to IPFS using Pinata. Secure JWT authentication, drag & drop interface, and instant IPFS hash generation for Web3 developers.',
  ogDescription: 'Easily upload NFT images and metadata files to IPFS using Pinata. Secure JWT authentication, drag & drop interface, and instant IPFS hash generation for Web3 developers.',
  ogImage: 'https://file2ipfs.netlify.app/og-image.jpg',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://file2ipfs.netlify.app/og-image.jpg',
  keywords: 'IPFS upload, Pinata integration, NFT file storage, decentralized storage, Web3 tools, blockchain development, IPFS pinning, NFT metadata',
  robots: 'index, follow'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://file2ipfs.netlify.app' }
  ]
})

const jwt = ref("");
const gateway = ref("");

const { header, payload } = useJwt(jwt);

const isValidJWT = computed(() => {
  if (!jwt.value) return false;
  const parts = jwt.value.split(".");
  return parts.length === 3 && parts.every((part) => part.length > 0);
});

const isValidURL = computed(() => {
  if (!gateway.value) return false;
  if (gateway.value.includes(".mypinata.cloud")) return true;
  return false;
});

const isConfigured = computed(() => isValidJWT.value && isValidURL.value);

const configStatus = computed(() => {
  if (isConfigured.value) {
    return { color: "bg-green-400 animate-pulse", text: "Ready to upload" };
  } else if (jwt.value || gateway.value) {
    return { color: "bg-yellow-400", text: "Configuration incomplete" };
  } else {
    return { color: "bg-red-400", text: "Not configured" };
  }
});

const saveConfig = () => {
  if (isConfigured.value) {
    if (payload.value) {
      useCookies().set("jwt", jwt.value);
      useCookies().set("gatewayUrl", gateway.value);
      navigateTo("/dashboard");
    }
  }
};
</script>
