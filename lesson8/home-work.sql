2. Create query to Get top 5 cities with highest number of Employees in it.
3. Create query to Get top 5 Customers with highest number of Orders.
4. Create query to Get top 5 Customers with biggest total quantity of items from all orders.
5. Create query to Get all product and category information at the same query.

2. 
SELECT Customers.City, COUNT(Orders.EmployeeID) as Employees FROM Customers
INNER JOIN Orders ON Customers.CustomerID=Orders.CustomerID
GROUP BY Citycd
ORDER BY Employees DESC
LIMIT 5 
3. 
SELECT Customers.CustomerName, COUNT(Orders.OrderID) as Orders FROM Customers
INNER JOIN Orders ON Customers.CustomerID=Orders.CustomerID
GROUP BY Orders.CustomerID
ORDER BY Orders DESC
LIMIT 5 

4. 
SELECT Customers.CustomerName, SUM(OrderDetails.Quantity) as TotQuant FROM Customers
INNER JOIN Orders ON Customers.CustomerID=Orders.CustomerID
INNER JOIN OrderDetails ON OrderDetails.OrderID=Orders.OrderID
GROUP BY Customers.CustomerId
ORDER BY TotQuant DESC
LIMIT 5

5. 
SELECT * FROM [Products]
FULL JOIN Categories ON Products.CategoryID=Categories.CategoryID
