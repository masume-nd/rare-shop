import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { ProductsApi } from "../../../api/Products";

const useStyle = makeStyles({
   root: {
      background: "#E6BC98",
      margin: "auto",
      width: "70%",
      padding: 50,
      overflow: "hidden",
      border: "1px solid black",

      "& .MuiButtonBase-root svg": {
         transform: "rotate(180deg)",
      },
      "& .row_cell": {
         width: 300,
         textAlign: "center",
      },
      "& .MuiTableCell-head ": {
         background: "black",
         color: "white",
         padding: 40,
      },
      "& .MuiButton-root": {
         background: "black",
         marginBottom: "1rem",
      },
      "& .MuiTableContainer-root::-webkit-scrollbar": {
         display: "none" /* for Chrome, Safari, and Opera */,
      },
   },
   myInput: {
      border: "none",
      textAlign: "center",
   },
});

export default function Inventories() {
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [products, setProducts] = useState([]);
   const [edit, setEdit] = useState(false);
   const [price, setPrice] = useState([]);
   const [editedId, setEditedId] = useState([]);
   const [editableData, setEditableData] = useState([]);
   const classes = useStyle();

   const getProducts = async () => {
      const priceInventory = [];
      const res = await ProductsApi.gets();
      setProducts(res.data);
      Object.values(res.data).map((item) => {
         priceInventory.push({
            id: item.id,
            price: item.price,
            inventory: item.inventory,
         });
      });
      setEditableData(priceInventory);
   };

   const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  
   const handleChange = ({target}, id) => {
      const {value, name} = target
      const requestedData = editableData.filter(el => el.id === id)
      
      editableData[id] = {
         ...editableData[id],
         [name]: value
         };
   };

   // const updatePrice = () => {
   //    const apiCall = async () => {
   //       if (price) {
   //          await ProductsApi.patch(price.id, { price: price.value });
   //       }
   //       if (inventory) {
   //          await ProductsApi.patch(inventory.id, {
   //             inventory: inventory.value,
   //          });
   //       }
   //    };
   //    apiCall();
   // };

   useEffect(() => {
      getProducts();
      console.log(editedId);
   }, [price]);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };
   function defaultLabelDisplayedRows({ from, to, count }) {
      return `${from}–${to} از ${count !== -1 ? count : `more than ${to}`}`;
   }
   const getValues = (id) => {
      let target = editableData.filter(el => el.id === id) 
      return target[0]
   }
   return (
      <div className={classes.root}>
         <Button  className={classes.myButton}>
            ذخیره
         </Button>
         <Paper sx={{ borderRadius: 0 }}>
            <TableContainer sx={{ maxHeight: 440 }}>
               <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                     <TableRow className={classes.table_row}>
                        <TableCell className="row_cell">نام کالا</TableCell>
                        <TableCell className="row_cell">قیمت</TableCell>
                        <TableCell className="row_cell">موجودی</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {Object.values(products)
                        .slice(
                           page * rowsPerPage,
                           page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                           if (row.inventory > 0) {
                              return (
                                 <TableRow
                                    className="table_row"
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.code}
                                 >
                                    <TableCell className="row_cell">
                                       {row.name}
                                    </TableCell>
                                    <TableCell className="row_cell">
                                       <div onClick={() => setEdit(!edit)}>
                                          {
                                             <input
                                                name="price"
                                                value={getValues(row.id).price}
                                                className={classes.myInput}
                                                type={
                                                   edit ? "text" : "readonly"
                                                }
                                                onChange={(e) =>
                                                   handleChange(e, row.id)
                                                }
                                             />
                                          }
                                       </div>
                                    </TableCell>
                                    <TableCell className="row_cell">
                                       <input
                                          name="inventory"
                                          value={getValues(row.id).inventory}                                          className={classes.myInput}
                                          type={edit ? "text" : "readonly"}
                                          onChange={(e) =>
                                             handleChange(e, row.id)
                                          }
                                       />
                                    </TableCell>
                                 </TableRow>
                              );
                           }
                        })}
                  </TableBody>
               </Table>
            </TableContainer>
            <TablePagination
               className={classes.pagination}
               rowsPerPageOptions={[10, 25, 100]}
               component="div"
               labelRowsPerPage="صفحه"
               count={products.length}
               rowsPerPage={rowsPerPage}
               labelDisplayedRows={defaultLabelDisplayedRows}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
            />
         </Paper>
      </div>
      // </div>
   );
}
