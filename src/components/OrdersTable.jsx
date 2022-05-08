import { React }from 'react';
import {useIndexResourceState, Card, IndexTable } from '@shopify/polaris';
import { ExportToCsv } from 'export-to-csv';

const options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: false,
    title: 'Orders CSV',
    filename: 'Orders CSV',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
const csvExporter = new ExportToCsv(options);


export function OrdersTable({orders}) {

    
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(orders);
  const promotedBulkActions = [
    {
      content: 'Export CSV',
      onAction: () => {
          console.log(selectedResources);
          csvExporter.generateCsv(orders.filter(order=>selectedResources.includes(order.id)) );
        },
    },
  ];

//   console.log(data.orders.edges)
//   console.log("orders", orders)

  const rowMarkup = orders.map(
    ({id, name, totalPrice, createdAt, customerEmail}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>{name}</IndexTable.Cell>
        <IndexTable.Cell>{totalPrice}</IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{customerEmail}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        promotedBulkActions={promotedBulkActions}
        headings={[
          {title: 'Name'},
          {title: 'TotalPrice'},
          {title: 'CreatedAt'},
          {title: 'customerEmail'}
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}
