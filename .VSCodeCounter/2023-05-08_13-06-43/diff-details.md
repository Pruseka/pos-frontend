# Diff Details

Date : 2023-05-08 13:06:43

Directory c:\\Users\\rday6\\OneDrive\\Desktop\\pos-frontend-mantine

Total : 145 files,  10578 codes, 530 comments, 1260 blanks, all 12368 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [package.json](/package.json) | JSON | 1 | 0 | 0 | 1 |
| [src/api/customer-stock/queries/getClosingStocks.ts](/src/api/customer-stock/queries/getClosingStocks.ts) | TypeScript | 16 | 0 | 4 | 20 |
| [src/api/customer-stock/queries/getInStocks.ts](/src/api/customer-stock/queries/getInStocks.ts) | TypeScript | 26 | 0 | 5 | 31 |
| [src/api/customer-stock/queries/getOutStocks.ts](/src/api/customer-stock/queries/getOutStocks.ts) | TypeScript | 26 | 0 | 5 | 31 |
| [src/api/customerTransfer/mutations/transferCustomer.ts](/src/api/customerTransfer/mutations/transferCustomer.ts) | TypeScript | 17 | 0 | 3 | 20 |
| [src/api/customerTransfer/queries/getTransfersByDate.ts](/src/api/customerTransfer/queries/getTransfersByDate.ts) | TypeScript | 23 | 0 | 6 | 29 |
| [src/api/expense/mutations/addExpense.ts](/src/api/expense/mutations/addExpense.ts) | TypeScript | 16 | 0 | 3 | 19 |
| [src/api/expense/mutations/updateExpense.ts](/src/api/expense/mutations/updateExpense.ts) | TypeScript | 18 | 0 | 3 | 21 |
| [src/api/expense/queries/getExpensesByDate.ts](/src/api/expense/queries/getExpensesByDate.ts) | TypeScript | 16 | 0 | 4 | 20 |
| [src/api/instance.ts](/src/api/instance.ts) | TypeScript | 3 | 0 | 0 | 3 |
| [src/api/invoice/mutations/updateInvoice.ts](/src/api/invoice/mutations/updateInvoice.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [src/api/invoice/queries/getCreditInvoiceByDate.ts](/src/api/invoice/queries/getCreditInvoiceByDate.ts) | TypeScript | 35 | 0 | 8 | 43 |
| [src/api/invoice/queries/getInvoiceById.ts](/src/api/invoice/queries/getInvoiceById.ts) | TypeScript | 29 | 0 | 5 | 34 |
| [src/api/invoice/queries/getInvoicesByDate.ts](/src/api/invoice/queries/getInvoicesByDate.ts) | TypeScript | -3 | 0 | 0 | -3 |
| [src/api/salesman-stock/queries/getClosingStocks.ts](/src/api/salesman-stock/queries/getClosingStocks.ts) | TypeScript | 16 | 0 | 4 | 20 |
| [src/api/salesman-stock/queries/getInStocks.ts](/src/api/salesman-stock/queries/getInStocks.ts) | TypeScript | 25 | 0 | 5 | 30 |
| [src/api/salesman-stock/queries/getOutStocks.ts](/src/api/salesman-stock/queries/getOutStocks.ts) | TypeScript | 26 | 0 | 5 | 31 |
| [src/api/summary/queries/getSummary.ts](/src/api/summary/queries/getSummary.ts) | TypeScript | 22 | 0 | 4 | 26 |
| [src/api/supplier/mutations/addSupplier.ts](/src/api/supplier/mutations/addSupplier.ts) | TypeScript | 20 | 0 | 3 | 23 |
| [src/api/supplier/mutations/updateSupplier.ts](/src/api/supplier/mutations/updateSupplier.ts) | TypeScript | 20 | 0 | 3 | 23 |
| [src/api/supplier/queries/getAllSuppliers.ts](/src/api/supplier/queries/getAllSuppliers.ts) | TypeScript | 16 | 0 | 4 | 20 |
| [src/api/supply/mutations/provideSupply.ts](/src/api/supply/mutations/provideSupply.ts) | TypeScript | 17 | 0 | 3 | 20 |
| [src/api/supply/mutations/updateSupply.ts](/src/api/supply/mutations/updateSupply.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [src/api/supply/queries/getCreditSupplyByDate.ts](/src/api/supply/queries/getCreditSupplyByDate.ts) | TypeScript | 24 | 0 | 6 | 30 |
| [src/api/supply/queries/getSupplyByDate.ts](/src/api/supply/queries/getSupplyByDate.ts) | TypeScript | 28 | 0 | 7 | 35 |
| [src/api/supply/queries/getSupplyById.ts](/src/api/supply/queries/getSupplyById.ts) | TypeScript | 26 | 0 | 5 | 31 |
| [src/api/transfer/mutations/transferSalesman.ts](/src/api/transfer/mutations/transferSalesman.ts) | TypeScript | 17 | 0 | 3 | 20 |
| [src/api/transfer/queries/getTransfersByDate.ts](/src/api/transfer/queries/getTransfersByDate.ts) | TypeScript | 34 | 0 | 8 | 42 |
| [src/api/user/mutations/createUser.ts](/src/api/user/mutations/createUser.ts) | TypeScript | 23 | 0 | 4 | 27 |
| [src/api/user/mutations/updateUser.ts](/src/api/user/mutations/updateUser.ts) | TypeScript | 16 | 0 | 3 | 19 |
| [src/api/user/mutations/updateUserPassword.ts](/src/api/user/mutations/updateUserPassword.ts) | TypeScript | 14 | 0 | 3 | 17 |
| [src/api/user/queries/getAllUsers.ts](/src/api/user/queries/getAllUsers.ts) | TypeScript | 20 | 0 | 4 | 24 |
| [src/api/user/queries/getAllVansales.ts](/src/api/user/queries/getAllVansales.ts) | TypeScript | 20 | 0 | 4 | 24 |
| [src/api/warehouse/queries/getClosingStock.ts](/src/api/warehouse/queries/getClosingStock.ts) | TypeScript | 16 | 0 | 4 | 20 |
| [src/api/warehouse/queries/getInStocks.ts](/src/api/warehouse/queries/getInStocks.ts) | TypeScript | 26 | 0 | 5 | 31 |
| [src/api/warehouse/queries/getInvoiceRecords.ts](/src/api/warehouse/queries/getInvoiceRecords.ts) | TypeScript | 26 | 0 | 5 | 31 |
| [src/api/warehouse/queries/getOutStocks.ts](/src/api/warehouse/queries/getOutStocks.ts) | TypeScript | 26 | 0 | 5 | 31 |
| [src/lib/constants/nav-links.ts](/src/lib/constants/nav-links.ts) | TypeScript | 108 | 0 | 7 | 115 |
| [src/modules/nav/components/navbar-body/index.tsx](/src/modules/nav/components/navbar-body/index.tsx) | TypeScript JSX | 18 | 0 | 3 | 21 |
| [src/modules/nav/components/navbar-container/styles.ts](/src/modules/nav/components/navbar-container/styles.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/modules/nav/components/navbar-footer/styles.ts](/src/modules/nav/components/navbar-footer/styles.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [src/modules/nav/components/navbar/index.tsx](/src/modules/nav/components/navbar/index.tsx) | TypeScript JSX | 0 | -1 | 0 | -1 |
| [src/modules/table/components/category-table/styles.ts](/src/modules/table/components/category-table/styles.ts) | TypeScript | 3 | 0 | 0 | 3 |
| [src/modules/table/components/customer-stock-table/closing-stocks/index.tsx](/src/modules/table/components/customer-stock-table/closing-stocks/index.tsx) | TypeScript JSX | 45 | 0 | 7 | 52 |
| [src/modules/table/components/customer-stock-table/closing-stocks/styles.ts](/src/modules/table/components/customer-stock-table/closing-stocks/styles.ts) | TypeScript | 44 | 0 | 1 | 45 |
| [src/modules/table/components/customer-stock-table/closing-stocks/table.tsx](/src/modules/table/components/customer-stock-table/closing-stocks/table.tsx) | TypeScript JSX | 177 | 16 | 18 | 211 |
| [src/modules/table/components/customer-stock-table/in-stocks/index.tsx](/src/modules/table/components/customer-stock-table/in-stocks/index.tsx) | TypeScript JSX | 57 | 0 | 8 | 65 |
| [src/modules/table/components/customer-stock-table/in-stocks/styles.ts](/src/modules/table/components/customer-stock-table/in-stocks/styles.ts) | TypeScript | 51 | 0 | 10 | 61 |
| [src/modules/table/components/customer-stock-table/in-stocks/table.tsx](/src/modules/table/components/customer-stock-table/in-stocks/table.tsx) | TypeScript JSX | 269 | 8 | 25 | 302 |
| [src/modules/table/components/customer-stock-table/out-stocks/index.tsx](/src/modules/table/components/customer-stock-table/out-stocks/index.tsx) | TypeScript JSX | 61 | 0 | 8 | 69 |
| [src/modules/table/components/customer-stock-table/out-stocks/styles.ts](/src/modules/table/components/customer-stock-table/out-stocks/styles.ts) | TypeScript | 51 | 0 | 10 | 61 |
| [src/modules/table/components/customer-stock-table/out-stocks/table.tsx](/src/modules/table/components/customer-stock-table/out-stocks/table.tsx) | TypeScript JSX | 269 | 8 | 25 | 302 |
| [src/modules/table/components/customer-table/form-modal.tsx](/src/modules/table/components/customer-table/form-modal.tsx) | TypeScript JSX | -1 | 0 | 0 | -1 |
| [src/modules/table/components/customer-table/styles.ts](/src/modules/table/components/customer-table/styles.ts) | TypeScript | 3 | 0 | 0 | 3 |
| [src/modules/table/components/customer-table/table.tsx](/src/modules/table/components/customer-table/table.tsx) | TypeScript JSX | 12 | 0 | 1 | 13 |
| [src/modules/table/components/customer-transfer-table/add/customer-form.tsx](/src/modules/table/components/customer-transfer-table/add/customer-form.tsx) | TypeScript JSX | 94 | 1 | 12 | 107 |
| [src/modules/table/components/customer-transfer-table/add/index.tsx](/src/modules/table/components/customer-transfer-table/add/index.tsx) | TypeScript JSX | 138 | 0 | 16 | 154 |
| [src/modules/table/components/customer-transfer-table/add/invoice-form.tsx](/src/modules/table/components/customer-transfer-table/add/invoice-form.tsx) | TypeScript JSX | 151 | 1 | 17 | 169 |
| [src/modules/table/components/customer-transfer-table/add/styles.ts](/src/modules/table/components/customer-transfer-table/add/styles.ts) | TypeScript | 89 | 0 | 6 | 95 |
| [src/modules/table/components/customer-transfer-table/add/table.tsx](/src/modules/table/components/customer-transfer-table/add/table.tsx) | TypeScript JSX | 123 | 0 | 18 | 141 |
| [src/modules/table/components/customer-transfer-table/index.tsx](/src/modules/table/components/customer-transfer-table/index.tsx) | TypeScript JSX | 48 | 0 | 7 | 55 |
| [src/modules/table/components/customer-transfer-table/styles.ts](/src/modules/table/components/customer-transfer-table/styles.ts) | TypeScript | 57 | 0 | 10 | 67 |
| [src/modules/table/components/customer-transfer-table/table.tsx](/src/modules/table/components/customer-transfer-table/table.tsx) | TypeScript JSX | 268 | 52 | 26 | 346 |
| [src/modules/table/components/expense-table/form-modal.tsx](/src/modules/table/components/expense-table/form-modal.tsx) | TypeScript JSX | 76 | 41 | 11 | 128 |
| [src/modules/table/components/expense-table/index.tsx](/src/modules/table/components/expense-table/index.tsx) | TypeScript JSX | 78 | 1 | 10 | 89 |
| [src/modules/table/components/expense-table/styles.ts](/src/modules/table/components/expense-table/styles.ts) | TypeScript | 47 | 0 | 1 | 48 |
| [src/modules/table/components/expense-table/table.tsx](/src/modules/table/components/expense-table/table.tsx) | TypeScript JSX | 277 | 13 | 27 | 317 |
| [src/modules/table/components/invoice-table/add/customer-form.tsx](/src/modules/table/components/invoice-table/add/customer-form.tsx) | TypeScript JSX | 15 | 0 | 1 | 16 |
| [src/modules/table/components/invoice-table/add/index.tsx](/src/modules/table/components/invoice-table/add/index.tsx) | TypeScript JSX | 55 | 0 | 4 | 59 |
| [src/modules/table/components/invoice-table/add/invoice-form.tsx](/src/modules/table/components/invoice-table/add/invoice-form.tsx) | TypeScript JSX | 28 | -1 | 2 | 29 |
| [src/modules/table/components/invoice-table/add/styles.ts](/src/modules/table/components/invoice-table/add/styles.ts) | TypeScript | 32 | 0 | 3 | 35 |
| [src/modules/table/components/invoice-table/add/table.tsx](/src/modules/table/components/invoice-table/add/table.tsx) | TypeScript JSX | 41 | -8 | 0 | 33 |
| [src/modules/table/components/invoice-table/credit/index.tsx](/src/modules/table/components/invoice-table/credit/index.tsx) | TypeScript JSX | 77 | 0 | 9 | 86 |
| [src/modules/table/components/invoice-table/credit/styles.ts](/src/modules/table/components/invoice-table/credit/styles.ts) | TypeScript | 75 | 0 | 12 | 87 |
| [src/modules/table/components/invoice-table/credit/table.tsx](/src/modules/table/components/invoice-table/credit/table.tsx) | TypeScript JSX | 242 | 57 | 29 | 328 |
| [src/modules/table/components/invoice-table/index.tsx](/src/modules/table/components/invoice-table/index.tsx) | TypeScript JSX | 17 | 0 | 1 | 18 |
| [src/modules/table/components/invoice-table/styles.ts](/src/modules/table/components/invoice-table/styles.ts) | TypeScript | 31 | 0 | 10 | 41 |
| [src/modules/table/components/invoice-table/table.tsx](/src/modules/table/components/invoice-table/table.tsx) | TypeScript JSX | 109 | -3 | 11 | 117 |
| [src/modules/table/components/invoice-table/view/customer-form.tsx](/src/modules/table/components/invoice-table/view/customer-form.tsx) | TypeScript JSX | 47 | 0 | 5 | 52 |
| [src/modules/table/components/invoice-table/view/index.tsx](/src/modules/table/components/invoice-table/view/index.tsx) | TypeScript JSX | 66 | 0 | 8 | 74 |
| [src/modules/table/components/invoice-table/view/styles.ts](/src/modules/table/components/invoice-table/view/styles.ts) | TypeScript | 84 | 5 | 6 | 95 |
| [src/modules/table/components/invoice-table/view/table.tsx](/src/modules/table/components/invoice-table/view/table.tsx) | TypeScript JSX | 147 | 0 | 14 | 161 |
| [src/modules/table/components/item-table/form-modal.tsx](/src/modules/table/components/item-table/form-modal.tsx) | TypeScript JSX | -1 | 0 | 0 | -1 |
| [src/modules/table/components/item-table/index.tsx](/src/modules/table/components/item-table/index.tsx) | TypeScript JSX | 1 | 0 | 0 | 1 |
| [src/modules/table/components/item-table/styles.ts](/src/modules/table/components/item-table/styles.ts) | TypeScript | 6 | 0 | 0 | 6 |
| [src/modules/table/components/item-table/table.tsx](/src/modules/table/components/item-table/table.tsx) | TypeScript JSX | 17 | 0 | 1 | 18 |
| [src/modules/table/components/salesman-table/closing-stocks/index.tsx](/src/modules/table/components/salesman-table/closing-stocks/index.tsx) | TypeScript JSX | 53 | 0 | 9 | 62 |
| [src/modules/table/components/salesman-table/closing-stocks/styles.ts](/src/modules/table/components/salesman-table/closing-stocks/styles.ts) | TypeScript | 44 | 0 | 1 | 45 |
| [src/modules/table/components/salesman-table/closing-stocks/table.tsx](/src/modules/table/components/salesman-table/closing-stocks/table.tsx) | TypeScript JSX | 182 | 16 | 18 | 216 |
| [src/modules/table/components/salesman-table/in-stocks/index.tsx](/src/modules/table/components/salesman-table/in-stocks/index.tsx) | TypeScript JSX | 63 | 0 | 9 | 72 |
| [src/modules/table/components/salesman-table/in-stocks/styles.ts](/src/modules/table/components/salesman-table/in-stocks/styles.ts) | TypeScript | 51 | 0 | 10 | 61 |
| [src/modules/table/components/salesman-table/in-stocks/table.tsx](/src/modules/table/components/salesman-table/in-stocks/table.tsx) | TypeScript JSX | 271 | 8 | 25 | 304 |
| [src/modules/table/components/salesman-table/out-stocks/index.tsx](/src/modules/table/components/salesman-table/out-stocks/index.tsx) | TypeScript JSX | 58 | 0 | 9 | 67 |
| [src/modules/table/components/salesman-table/out-stocks/styles.ts](/src/modules/table/components/salesman-table/out-stocks/styles.ts) | TypeScript | 51 | 0 | 10 | 61 |
| [src/modules/table/components/salesman-table/out-stocks/table.tsx](/src/modules/table/components/salesman-table/out-stocks/table.tsx) | TypeScript JSX | 250 | 8 | 22 | 280 |
| [src/modules/table/components/salesman-transfer-table/add/index.tsx](/src/modules/table/components/salesman-transfer-table/add/index.tsx) | TypeScript JSX | 138 | 0 | 16 | 154 |
| [src/modules/table/components/salesman-transfer-table/add/invoice-form.tsx](/src/modules/table/components/salesman-transfer-table/add/invoice-form.tsx) | TypeScript JSX | 151 | 1 | 17 | 169 |
| [src/modules/table/components/salesman-transfer-table/add/styles.ts](/src/modules/table/components/salesman-transfer-table/add/styles.ts) | TypeScript | 89 | 0 | 6 | 95 |
| [src/modules/table/components/salesman-transfer-table/add/table.tsx](/src/modules/table/components/salesman-transfer-table/add/table.tsx) | TypeScript JSX | 123 | 0 | 18 | 141 |
| [src/modules/table/components/salesman-transfer-table/add/user-form.tsx](/src/modules/table/components/salesman-transfer-table/add/user-form.tsx) | TypeScript JSX | 90 | 1 | 12 | 103 |
| [src/modules/table/components/salesman-transfer-table/index.tsx](/src/modules/table/components/salesman-transfer-table/index.tsx) | TypeScript JSX | 53 | 0 | 7 | 60 |
| [src/modules/table/components/salesman-transfer-table/styles.ts](/src/modules/table/components/salesman-transfer-table/styles.ts) | TypeScript | 57 | 0 | 10 | 67 |
| [src/modules/table/components/salesman-transfer-table/table.tsx](/src/modules/table/components/salesman-transfer-table/table.tsx) | TypeScript JSX | 260 | 52 | 26 | 338 |
| [src/modules/table/components/summary-table/index.tsx](/src/modules/table/components/summary-table/index.tsx) | TypeScript JSX | 38 | 1 | 10 | 49 |
| [src/modules/table/components/summary-table/styles.ts](/src/modules/table/components/summary-table/styles.ts) | TypeScript | 17 | 0 | 2 | 19 |
| [src/modules/table/components/summary-table/table.tsx](/src/modules/table/components/summary-table/table.tsx) | TypeScript JSX | 97 | 0 | 16 | 113 |
| [src/modules/table/components/supplier-table/form-modal.tsx](/src/modules/table/components/supplier-table/form-modal.tsx) | TypeScript JSX | 72 | 41 | 12 | 125 |
| [src/modules/table/components/supplier-table/index.tsx](/src/modules/table/components/supplier-table/index.tsx) | TypeScript JSX | 59 | 1 | 8 | 68 |
| [src/modules/table/components/supplier-table/styles.ts](/src/modules/table/components/supplier-table/styles.ts) | TypeScript | 44 | 0 | 1 | 45 |
| [src/modules/table/components/supplier-table/table.tsx](/src/modules/table/components/supplier-table/table.tsx) | TypeScript JSX | 209 | 13 | 20 | 242 |
| [src/modules/table/components/supply-table/add/customer-form.tsx](/src/modules/table/components/supply-table/add/customer-form.tsx) | TypeScript JSX | 90 | 0 | 11 | 101 |
| [src/modules/table/components/supply-table/add/index.tsx](/src/modules/table/components/supply-table/add/index.tsx) | TypeScript JSX | 144 | 0 | 16 | 160 |
| [src/modules/table/components/supply-table/add/invoice-form.tsx](/src/modules/table/components/supply-table/add/invoice-form.tsx) | TypeScript JSX | 200 | 1 | 19 | 220 |
| [src/modules/table/components/supply-table/add/styles.ts](/src/modules/table/components/supply-table/add/styles.ts) | TypeScript | 89 | 0 | 6 | 95 |
| [src/modules/table/components/supply-table/add/table.tsx](/src/modules/table/components/supply-table/add/table.tsx) | TypeScript JSX | 154 | 0 | 16 | 170 |
| [src/modules/table/components/supply-table/credit/index.tsx](/src/modules/table/components/supply-table/credit/index.tsx) | TypeScript JSX | 80 | 0 | 9 | 89 |
| [src/modules/table/components/supply-table/credit/styles.ts](/src/modules/table/components/supply-table/credit/styles.ts) | TypeScript | 75 | 0 | 12 | 87 |
| [src/modules/table/components/supply-table/credit/table.tsx](/src/modules/table/components/supply-table/credit/table.tsx) | TypeScript JSX | 240 | 57 | 29 | 326 |
| [src/modules/table/components/supply-table/index.tsx](/src/modules/table/components/supply-table/index.tsx) | TypeScript JSX | 51 | 0 | 7 | 58 |
| [src/modules/table/components/supply-table/styles.ts](/src/modules/table/components/supply-table/styles.ts) | TypeScript | 75 | 0 | 12 | 87 |
| [src/modules/table/components/supply-table/table.tsx](/src/modules/table/components/supply-table/table.tsx) | TypeScript JSX | 289 | 60 | 32 | 381 |
| [src/modules/table/components/supply-table/view/index.tsx](/src/modules/table/components/supply-table/view/index.tsx) | TypeScript JSX | 58 | 0 | 8 | 66 |
| [src/modules/table/components/supply-table/view/styles.ts](/src/modules/table/components/supply-table/view/styles.ts) | TypeScript | 84 | 5 | 6 | 95 |
| [src/modules/table/components/supply-table/view/supplier-form.tsx](/src/modules/table/components/supply-table/view/supplier-form.tsx) | TypeScript JSX | 35 | 0 | 6 | 41 |
| [src/modules/table/components/supply-table/view/table.tsx](/src/modules/table/components/supply-table/view/table.tsx) | TypeScript JSX | 140 | 0 | 13 | 153 |
| [src/modules/table/components/user-table/form-modal.tsx](/src/modules/table/components/user-table/form-modal.tsx) | TypeScript JSX | 89 | 41 | 13 | 143 |
| [src/modules/table/components/user-table/index.tsx](/src/modules/table/components/user-table/index.tsx) | TypeScript JSX | 65 | 0 | 8 | 73 |
| [src/modules/table/components/user-table/password-form-modal.tsx](/src/modules/table/components/user-table/password-form-modal.tsx) | TypeScript JSX | 44 | 0 | 10 | 54 |
| [src/modules/table/components/user-table/styles.ts](/src/modules/table/components/user-table/styles.ts) | TypeScript | 44 | 0 | 1 | 45 |
| [src/modules/table/components/user-table/table.tsx](/src/modules/table/components/user-table/table.tsx) | TypeScript JSX | 252 | 0 | 23 | 275 |
| [src/modules/table/components/warehouse-table/closing-stocks/index.tsx](/src/modules/table/components/warehouse-table/closing-stocks/index.tsx) | TypeScript JSX | 36 | 0 | 6 | 42 |
| [src/modules/table/components/warehouse-table/closing-stocks/styles.ts](/src/modules/table/components/warehouse-table/closing-stocks/styles.ts) | TypeScript | 44 | 0 | 1 | 45 |
| [src/modules/table/components/warehouse-table/closing-stocks/table.tsx](/src/modules/table/components/warehouse-table/closing-stocks/table.tsx) | TypeScript JSX | 150 | 16 | 18 | 184 |
| [src/modules/table/components/warehouse-table/in-stocks/index.tsx](/src/modules/table/components/warehouse-table/in-stocks/index.tsx) | TypeScript JSX | 37 | 0 | 7 | 44 |
| [src/modules/table/components/warehouse-table/in-stocks/styles.ts](/src/modules/table/components/warehouse-table/in-stocks/styles.ts) | TypeScript | 51 | 0 | 10 | 61 |
| [src/modules/table/components/warehouse-table/in-stocks/table.tsx](/src/modules/table/components/warehouse-table/in-stocks/table.tsx) | TypeScript JSX | 251 | 8 | 26 | 285 |
| [src/modules/table/components/warehouse-table/invoice-records/index.tsx](/src/modules/table/components/warehouse-table/invoice-records/index.tsx) | TypeScript JSX | 37 | 0 | 7 | 44 |
| [src/modules/table/components/warehouse-table/invoice-records/styles.ts](/src/modules/table/components/warehouse-table/invoice-records/styles.ts) | TypeScript | 51 | 0 | 10 | 61 |
| [src/modules/table/components/warehouse-table/invoice-records/table.tsx](/src/modules/table/components/warehouse-table/invoice-records/table.tsx) | TypeScript JSX | 249 | 8 | 26 | 283 |
| [src/modules/table/components/warehouse-table/out-stocks/index.tsx](/src/modules/table/components/warehouse-table/out-stocks/index.tsx) | TypeScript JSX | 37 | 0 | 7 | 44 |
| [src/modules/table/components/warehouse-table/out-stocks/styles.ts](/src/modules/table/components/warehouse-table/out-stocks/styles.ts) | TypeScript | 51 | 0 | 10 | 61 |
| [src/modules/table/components/warehouse-table/out-stocks/table.tsx](/src/modules/table/components/warehouse-table/out-stocks/table.tsx) | TypeScript JSX | 246 | 8 | 26 | 280 |
| [src/pages/layout.tsx](/src/pages/layout.tsx) | TypeScript JSX | 50 | 0 | 2 | 52 |
| [src/pages/root.tsx](/src/pages/root.tsx) | TypeScript JSX | -20 | -6 | -1 | -27 |
| [src/routes/index.tsx](/src/routes/index.tsx) | TypeScript JSX | 65 | 0 | 4 | 69 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details