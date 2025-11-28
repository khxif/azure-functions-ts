import { HttpResponseInit } from '@azure/functions';

export async function TryCatch(promise: Promise<HttpResponseInit>): Promise<HttpResponseInit> {
  try {
    return await promise;
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        jsonBody: {
          message: 'Internal Server Error',
          error: (error as Error)?.message ?? 'Unknown error',
        },
      },
    };
  }
}
