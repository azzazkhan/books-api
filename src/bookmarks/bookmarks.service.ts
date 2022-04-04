import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDTO, UpdateBookmarkDTO } from './validations';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  getAllBookmarks(userId: number) {
    return { userId, bookmarks: [] };
  }

  getBookmark(id: number, userId: number) {
    return { id, userId };
  }

  createBookmark(userId: number, data: CreateBookmarkDTO) {
    return { userId, ...data };
  }

  updateBookmark(id: number, userId: number, data: UpdateBookmarkDTO) {
    return { id, userId, ...data };
  }

  deleteBookmark(id: number, userId: number) {
    return { id, userId };
  }
}
