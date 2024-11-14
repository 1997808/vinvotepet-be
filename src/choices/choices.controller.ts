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
import { ChoicesService } from './choices.service';
import { Choices } from './domain/choices';
import { CreateChoicesDto } from './dto/create-choices.dto';
import { FindAllChoicesDto } from './dto/find-all-choices.dto';
import { UpdateChoicesDto } from './dto/update-choices.dto';

@ApiTags('Choices')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'choices',
  version: '1',
})
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Choices,
  })
  create(@Body() createChoicesDto: CreateChoicesDto) {
    return this.choicesService.create(createChoicesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Choices),
  })
  async findAll(
    @Query() query: FindAllChoicesDto,
  ): Promise<InfinityPaginationResponseDto<Choices>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.choicesService.findAllWithPagination({
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
    type: Choices,
  })
  findById(@Param('id') id: string) {
    return this.choicesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Choices,
  })
  update(@Param('id') id: string, @Body() updateChoicesDto: UpdateChoicesDto) {
    return this.choicesService.update(id, updateChoicesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.choicesService.remove(id);
  }
}
