import { useJwt } from "@vueuse/integrations/useJwt";

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
    data: PinataUploadData;
    ipfsUrl: string;
    gatewayUrl: string;
  }

  const form = await readMultipartFormData(event);
  const method = getMethod(event);

  if (!form || form.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No file provided",
    });
  }

  const fileData = form[0];

  if (
    !fileData ||
    !fileData.data ||
    !fileData.filename ||
    fileData.type != "application/json"
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid file data",
    });
  }

  const file = new File([fileData.data], fileData.filename);

  const formData = new FormData();
  formData.append("file", file);

  const headers = getHeaders(event);
  const jwt = headers.authorization?.replace("Bearer ", "");
  
  if (!jwt) {
    throw createError({
      statusCode: 401,
      statusMessage: "JWT token required",
    });
  }
  const { header, payload } = useJwt(jwt);

  const uploadRequest: PinataUploadData = await $fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method,
      headers: {
        Authorization: headers.authorization || "",
      },
      body: formData,
    }
  );
  console.log(uploadRequest)

  return uploadRequest;
});
