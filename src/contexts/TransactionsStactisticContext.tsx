import React, { createContext, useContext, useState, ReactNode } from "react";
import Transaction from "../model/Transaction.model"

type TransactionsByCategoryAndType = {
  [year: number]: {
    [month: number]: {
      [type: string]: {
        [category: string]: {
          trans: Transaction[];
          total: number;
        };
      };
    };
  };
};

interface Results {
  year: number;
  month: number;
  type: string;
  category: string;
  trans: Transaction[];
  total: number;
}


interface TransactionContextType {
  classfiedTransactions: TransactionsByCategoryAndType;
  loadTransaction: (newClassfiedTransactions: (Results | undefined)[]) => void
  updateTransactions: (year : number, month : number, type: string, category: string, newCategory: string, index: number, amount: number, description: string) => void
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [classfiedTransactions, setclassfiedTransactions] = useState<TransactionsByCategoryAndType>({});


  // const addTransaction = (transaction: Transaction) => {
  //   setTransactionsByCategory((prev) => {
  //     const category = transaction.category;
  //     return {
  //       ...prev,
  //       [category]: [...(prev[category] || []), transaction], 
  //     };
  //   });

  const updateTransactions = (
    year: number,
    month: number,
    type: string,
    category: string,
    newCategory: string,
    index: number,
    amount: number,
    description: string
  ) => {
    setclassfiedTransactions((prev) => {
      const updatedTransactions = { ...prev };
  
      const transaction = updatedTransactions[year][month][type][category].trans[index];
  
  
      if (index !== -1) {

  
        if (category !== newCategory) {
          if (!updatedTransactions[year][month][type][newCategory]) {
            updatedTransactions[year][month][type][newCategory] = { trans: [], total: 0 };
          }
  
          updatedTransactions[year][month][type][newCategory].trans.push(transaction);
          updatedTransactions[year][month][type][newCategory].total += amount;
  
          updatedTransactions[year][month][type][category].trans.splice(index, 1);
          updatedTransactions[year][month][type][category].total -= transaction.amount;
  
          if (updatedTransactions[year][month][type][category].trans.length === 0) {
            delete updatedTransactions[year][month][type][category];
          }
        } 

        else {
          updatedTransactions[year][month][type][category].total -= transaction.amount;
          updatedTransactions[year][month][type][category].total += amount;
        }

        transaction.amount = amount;
        transaction.category = newCategory;
        transaction.description = description;
      }
  
      return updatedTransactions;
    });
  };
  

  const loadTransaction = (newClassfiedTransactions: (Results | undefined)[]) => {
    setclassfiedTransactions((prev) => {
      const updatedTransactions = { ...prev };
  
      newClassfiedTransactions
        .filter((item): item is Results => item !== undefined) 
        .forEach(({ year, month, type, category, trans, total }) => {
          if (!updatedTransactions[year]) updatedTransactions[year] = {};
          if (!updatedTransactions[year][month]) updatedTransactions[year][month] = {};
          if (!updatedTransactions[year][month][type]) updatedTransactions[year][month][type] = {};
          if (!updatedTransactions[year][month][type][category]) {
            updatedTransactions[year][month][type][category] = { trans: [], total: 0 };
          }
  
          updatedTransactions[year][month][type][category].trans.push(...trans);
          updatedTransactions[year][month][type][category].total += total;
        });
  
      return updatedTransactions;
    });
  };
  
  

  return (
    <TransactionContext.Provider value={{ classfiedTransactions,  loadTransaction, updateTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};
