import { v4 as uuidv4 } from 'uuid';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      if (total < value) {
        throw Error('Transação negada. Crédito insuficiente.');
      }
    }

    const transaction = {
      id: uuidv4(),
      title,
      value,
      type,
    };

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
