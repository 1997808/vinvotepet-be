import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVotesDto } from './dto/create-votes.dto';
import { UpdateVotesDto } from './dto/update-votes.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Votes } from './domain/votes';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllVotesDto } from './dto/find-all-votes.dto';

@ApiTags('Votes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
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
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.votesService.remove(id);
  }
}
