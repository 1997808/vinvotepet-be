import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
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
import { VotingEvents } from './domain/voting-events';
import { CreateVotingEventsDto } from './dto/create-voting-events.dto';
import { FindAllVotingEventsDto } from './dto/find-all-voting-events.dto';
import { UpdateVotingEventsDto } from './dto/update-voting-events.dto';
import { VotingEventsService } from './voting-events.service';

@ApiTags('Votingevents')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'voting-events',
  version: '1',
})
export class VotingEventsController {
  constructor(private readonly votingEventsService: VotingEventsService) {}

  @Post()
  @ApiCreatedResponse({
    type: VotingEvents,
  })
  create(@Body() createVotingEventsDto: CreateVotingEventsDto) {
    return this.votingEventsService.create(createVotingEventsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(VotingEvents),
  })
  async findAll(
    @Query() query: FindAllVotingEventsDto,
  ): Promise<InfinityPaginationResponseDto<VotingEvents>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.votingEventsService.findAllWithPagination({
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
    type: VotingEvents,
  })
  findById(@Param('id') id: string) {
    return this.votingEventsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: VotingEvents,
  })
  update(
    @Param('id') id: string,
    @Body() updateVotingEventsDto: UpdateVotingEventsDto,
  ) {
    return this.votingEventsService.update(id, updateVotingEventsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.votingEventsService.remove(id);
  }
}
