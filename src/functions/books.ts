import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { createBooks, deleteBooks, editBooks, getBooks } from '../handlers/books';
import { TryCatch } from '../utils/try-catch';

export async function booksHandler(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  if (request.method === 'GET') return TryCatch(getBooks());
  if (request.method === 'POST') return TryCatch(createBooks(request));
  if (request.method === 'PUT') return TryCatch(editBooks(request));
  if (request.method === 'DELETE') return TryCatch(deleteBooks(request));

  return { status: 405, jsonBody: { message: 'Method Not Allowed' } };
}

app.http('books', {
  route: 'books/{id?}',
  authLevel: 'anonymous',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  handler: booksHandler,
});
