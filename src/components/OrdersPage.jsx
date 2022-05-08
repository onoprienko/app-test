import { gql, useQuery } from "@apollo/client";
import { Page, Layout, Banner, Card } from "@shopify/polaris";
import { Loading } from "@shopify/app-bridge-react";
import { OrdersTable } from "./OrdersTable";

const GET_ORDERS = gql`
query GetOrders {
  orders(first: 100) {
    edges {
      node {
        id
        totalPrice
        name
        createdAt
        customer {
          id
          email
        }
      }
    }
  }
}
`;

export function OrdersPage() {
    const { loading, error, data } = useQuery(GET_ORDERS);
    if (loading) return <Loading />;
    if (error) {
      console.warn(error);
      return (
        <Banner status="critical">There was an issue loading products.</Banner>
      );
    }
  
    let orders = data.orders.edges.map(order=>{
      let orderNew = {
          id: order.node.name,
          name: order.node.name,
          totalPrice: order.node.totalPrice,
          createdAt: order.node.createdAt,
          customerEmail: order.node.customer.email
      }
      return orderNew
    })

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <OrdersTable orders={orders}/>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}