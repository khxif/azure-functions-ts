import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BookCreateInput } from '../../generated/prisma/models';
import { prisma } from '../prisma';

export async function getBooks(): Promise<HttpResponseInit> {
  const books = await prisma.book.findMany();
  return { status: 200, jsonBody: { data: books } };
}

export async function createBooks(request: HttpRequest): Promise<HttpResponseInit> {
  const body = (await request.json()) as BookCreateInput;
  if (!body.title || !body.author)
    return { status: 400, jsonBody: { message: 'Title and Author are required fields' } };

  const newBook = await prisma.book.create({ data: body });

  return { status: 200, jsonBody: { message: 'Book Created Successfully', data: newBook } };
}

export async function editBooks(request: HttpRequest): Promise<HttpResponseInit> {
  const id = request.params.id;
  if (!id || isNaN(Number(id)))
    return { status: 400, jsonBody: { message: 'Book ID is required' } };

  const body = (await request.json()) as BookCreateInput;
  if (!body.title || !body.author)
    return { status: 400, jsonBody: { message: 'Title and Author are required fields' } };

  await prisma.book.update({ data: body, where: { id: Number(id) } });

  return { status: 200, jsonBody: { message: 'Book Updated Successfully' } };
}

export async function deleteBooks(request: HttpRequest): Promise<HttpResponseInit> {
  const id = request.params.id;
  if (!id || isNaN(Number(id)))
    return { status: 400, jsonBody: { message: 'Book ID is required' } };

  await prisma.book.delete({ where: { id: Number(id) } });

  return { status: 200, jsonBody: { message: 'Book Deleted Successfully' } };
}
