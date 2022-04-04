import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorators';
import { JwtGuard } from '../auth/guards';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDTO, UpdateBookmarkDTO } from './validations';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarksService.getAllBookmarks(userId);
  }

  @Get('/:id')
  getBookmarkById(@GetUser('id') userId: number, @Param('id') id: number) {
    return this.bookmarksService.getBookmark(id, userId);
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() data: CreateBookmarkDTO,
  ) {
    return this.bookmarksService.createBookmark(userId, data);
  }

  @Patch('/:id')
  updateBookmarkById(
    @GetUser('id') userId: number,
    @Param('id') id: number,
    @Body() data: UpdateBookmarkDTO,
  ) {
    return this.bookmarksService.updateBookmark(id, userId, data);
  }

  @Delete('/:id')
  deleteBookmarkById(@GetUser('id') userId: number, @Param('id') id: number) {
    return this.bookmarksService.deleteBookmark(id, userId);
  }
}
