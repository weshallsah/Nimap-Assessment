import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductListPage() {
  const [products, setProducts] = useState([
    { ProductId: 1, ProductName: "Laptop", CategoryId: 101, CategoryName: "Electronics" },
    { ProductId: 2, ProductName: "Shoes", CategoryId: 102, CategoryName: "Fashion" },
    { ProductId: 3, ProductName: "Chair", CategoryId: 103, CategoryName: "Furniture" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedData = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="space-x-2">
          <Button onClick={() => alert("Add Product clicked")}>Add Product</Button>
          <Button onClick={() => alert("Add Category clicked")} variant="outline">
            Add Category
          </Button>
        </div>
      </div>

      <Card className="shadow-lg rounded-2xl">
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">ProductId</th>
                <th className="p-3 border">ProductName</th>
                <th className="p-3 border">CategoryId</th>
                <th className="p-3 border">CategoryName</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.ProductId} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.ProductId}</td>
                  <td className="p-3 border">{item.ProductName}</td>
                  <td className="p-3 border">{item.CategoryId}</td>
                  <td className="p-3 border">{item.CategoryName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          variant="outline"
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            variant={currentPage === i + 1 ? "default" : "outline"}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
