export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) return
  if(!to.name) return

  const isExcempted = ['index', 'signup'].includes(to.name?.toString())
  const cookie = useCookie('jwt').value

  if (isExcempted) {
    if (cookie) {
      return navigateTo('/dashboard')
    }
    return
  }else if (!cookie) {
    return navigateTo('/')
  }
})
