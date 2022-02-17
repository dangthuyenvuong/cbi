import { RouterOrderDetail } from "@types";
import { Typography } from "atoms/Typography";
import { MyOrderDetailTemplate, MyOrderDetailTemplateProp, MyOrderDetailTemplateLoading } from "components/templates";
import { getMainLayout } from "layouts/MainLayout";
import { useParams } from "lib/cbi-react-core";
import { useHttp } from "lib/cbi-react-core/hooks/useHttp";
import moment from "moment";
import orderService from "services/orderService";
import { currency } from "utils";


const MyOrderDetail = () => {

    const { id } = useParams<RouterOrderDetail>();

    const { data: order } = useHttp(() => id ? orderService.getOrderDetail(id) : null, [id]);

    const columns: MyOrderDetailTemplateProp['columns'] = [
        {
            title: "Items Ordered ID",
            render: (e) => <span className="bold">{e?.id.slice(-12)}</span>,
        },
        {
            title: "Product",
            render: (item) => (
                <div className="flex items-center">
                    <img
                        src={item.thumbnailUrl}
                        alt="..."
                        className="m-r-15"
                        style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "6px",
                            objectFit: "cover",
                        }}
                    />
                    <Typography>{item.name}</Typography>
                </div>
            ),
        },

        {
            title: "Original Price",
            render: (item) => <div>{currency(item.regularPrice)}</div>,
        },
        {
            title: "Price",
            render: (item) => <div>{currency(item.finalPrice)}</div>,
        },
        {
            title: "Qty",
            render: (item) => <div>{item.quantity}</div>,
        },
        {
            title: "Subtotal",
            render: (item) => <div>{currency(item.quantity * item.finalPrice)}</div>,
        },
        {
            title: "Item status",
            render: (item) => <div>{item.metadata?.category.status}</div>,
        },
    ];

    if (order?.isPaid) {
        columns?.splice(2, 0, {
            title: "Purchase date",
            render: () => (
                <div>

                    {moment(order.payments[0].completedAt).format(
                        "MMM DD, YYYY HH:mm"
                    )}
                </div>
            ),
        })
    }

    if (!order) return <MyOrderDetailTemplateLoading />

    return <MyOrderDetailTemplate order={order} columns={columns} />

};


MyOrderDetail.getLayout = getMainLayout

export default MyOrderDetail;
