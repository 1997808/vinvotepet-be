import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { Votes } from './domain/votes';
import { CreateVotesDto } from './dto/create-votes.dto';
import { FindAllVotesDto } from './dto/find-all-votes.dto';
import { UpdateVotesDto } from './dto/update-votes.dto';
import { VotesService } from './votes.service';

@ApiTags('Votes')
@Controller({
  path: 'votes',
  version: '1',
})
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Votes,
  })
  create(@Body() createVotesDto: CreateVotesDto) {
    return this.votesService.create(createVotesDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: InfinityPaginationResponse(Votes),
  })
  async findAll(
    @Query() query: FindAllVotesDto,
  ): Promise<InfinityPaginationResponseDto<Votes>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.votesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Votes,
  })
  findById(@Param('id') id: string) {
    return this.votesService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Votes,
  })
  update(@Param('id') id: string, @Body() updateVotesDto: UpdateVotesDto) {
    return this.votesService.update(id, updateVotesDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.votesService.remove(id);
  }
}
