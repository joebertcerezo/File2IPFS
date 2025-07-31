<template>
  <section
    class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col justify-center items-center p-4"
  >
    <!-- Main content -->
    <div class="relative z-10 max-w-md w-full">
      <!-- Header with animated logo -->
      <header class="text-center mb-8">
        <div class="relative inline-block">
          <h1
            class="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 animate-pulse"
          >
            File2IPFS
          </h1>
          <div
            class="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"
          ></div>
        </div>
        <p class="text-gray-300 text-sm">
          Decentralized file storage made simple
        </p>
      </header>

      <main>
        <slot />
      </main>

      <footer class="mt-12 text-center">
        <div>
          <!-- Copyright and Credits -->
          <div class="text-xs text-gray-500 space-y-1">
            <p>© 2025 File2IPFS. Built with ❤️ for the decentralized web</p>
            <p class="text-gray-400">
              Created by
              <span class="text-cyan-400 font-medium">Joebert Cerezo</span>
            </p>
            <div class="flex justify-center items-center space-x-4 text-xs">
              <span class="flex items-center">
                <div
                  class="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"
                ></div>
                Powered by IPFS
              </span>
              <span class="text-gray-600">•</span>
              <span class="flex items-center">
                <div class="w-2 h-2 bg-purple-400 rounded-full mr-1"></div>
                Pinata Network
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </section>
</template>

<script lang="ts" setup></script>
