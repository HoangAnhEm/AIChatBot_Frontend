class Transaction {
    constructor({ _id, amount, wallet, partner, type, category, description, createdAt }) {
        this.id = _id;
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
