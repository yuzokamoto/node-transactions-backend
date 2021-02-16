import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    const total = this.transactions.reduce((acc, { value, type }) => {
      if (type === 'income') {
        income += value;
        return acc + value;
      }
      if (type === 'outcome') {
        outcome += value;
        return acc - value;
      }
      return acc;
    }, 0);

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
