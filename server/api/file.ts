export default defineEventHandler(async (event) => {
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
    data: PinataUploadData
    ipfsUrl: string
    gatewayUrl: string
  }

  const form = await readMultipartFormData(event)

  if (!form || form.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file provided'
    })
  }

  const fileData = form[0]


  if (!fileData || !fileData.data || !fileData.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid file data'
    })
  }

  const file = new File([fileData.data], fileData.filename, {
    type: fileData.type || 'application/octet-stream'
  })

  const formData = new FormData()
  formData.append("file", file)

  const headers = getHeaders(event)
  const jwt = headers.authorization?.replace('Bearer ', '')

  if (!jwt) {
    throw createError({
      statusCode: 401,
      statusMessage: 'JWT token required'
    })
  }


  const uploadRequest: PinataUploadResponse = await $fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: formData,
    }
  )

  console.log(uploadRequest)

  return uploadRequest

})
