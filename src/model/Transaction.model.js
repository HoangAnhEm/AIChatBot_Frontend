class Transaction {
    constructor({ amount, wallet, partner, type, category, description, createdAt }) {
        this.amount = amount;
        this.wallet = wallet;
        this.partner = partner;
        this.type = type;
        this.category = category;
        this.description = description;
        this.createdAt = new Date(createdAt);
    }
}

export default Transaction;
