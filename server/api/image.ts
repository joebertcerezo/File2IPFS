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
    !fileData.type?.startsWith("image/")
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid file data",
    });
  }
  const arrayBuffer = new Uint8Array(fileData.data);
  const file = new File([arrayBuffer], fileData.filename);

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
  return uploadRequest;
});
