import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XpTransactionsService } from './xp-transactions.service';
import { CreateXpTransactionDto } from './dto/create-xp-transaction.dto';
import { UpdateXpTransactionDto } from './dto/update-xp-transaction.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { XpTransaction } from './entities/xp-transaction.entity';

@ApiTags('xp-transactions')
@Controller('xp-transactions')
export class XpTransactionsController {
  constructor(private readonly xpTransactionsService: XpTransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle transaction XP' })
  @ApiResponse({ 
    status: 201, 
    description: 'Transaction XP créée avec succès',
    type: XpTransaction,
    content: {
      'application/json': {
        example: {
          uuid: '550e8400-e29b-41d4-a716-446655440000',
          transaction_type: 'GAIN',
          transaction_value: 100,
          createdAt: '2024-03-14T12:00:00Z',
          uuidMember: '123e4567-e89b-12d3-a456-426614174000',
          member: {
            uuid: '123e4567-e89b-12d3-a456-426614174000',
            guild_username: 'JohnDoe',
            xp: '100.00',
            level: 1,
            community_role: 'Member',
            status: 'Active'
          }
        }
      }
    }
  })
  async create(@Body() createXpTransactionDto: CreateXpTransactionDto): Promise<XpTransaction> {
    return await this.xpTransactionsService.create(createXpTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les transactions XP' })
  @ApiResponse({ status: 200, description: 'Liste des transactions XP récupérée avec succès', type: [XpTransaction] })
  async findAll(): Promise<XpTransaction[]> {
    return await this.xpTransactionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une transaction XP par son UUID' })
  @ApiParam({ name: 'id', description: 'UUID de la transaction XP' })
  @ApiResponse({ status: 200, description: 'Transaction XP trouvée', type: XpTransaction })
  @ApiResponse({ status: 404, description: 'Transaction XP non trouvée' })
  async findOne(@Param('id') id: string): Promise<XpTransaction> {
    return await this.xpTransactionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une transaction XP' })
  @ApiParam({ name: 'id', description: 'UUID de la transaction XP' })
  @ApiResponse({ status: 200, description: 'Transaction XP mise à jour avec succès', type: XpTransaction })
  @ApiResponse({ status: 404, description: 'Transaction XP non trouvée' })
  async update(
    @Param('id') id: string,
    @Body() updateXpTransactionDto: UpdateXpTransactionDto
  ): Promise<XpTransaction> {
    return await this.xpTransactionsService.update(id, updateXpTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une transaction XP' })
  @ApiParam({ name: 'id', description: 'UUID de la transaction XP' })
  @ApiResponse({ status: 200, description: 'Transaction XP supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Transaction XP non trouvée' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.xpTransactionsService.remove(id);
  }
}
