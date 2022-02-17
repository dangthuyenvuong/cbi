import { Order } from "@types";
import {
    Button,
    ColumnProps,
    NoData,
    Typography,
} from "components/atoms";
import { BreadcrumbItem } from "components/organisms";
import { AccountDataListTemplate } from "components/templates";
import { router } from "routers";
import { currency } from "utils";
import moment from "moment";
import { getMainLayout } from "layouts/MainLayout";
import { useNavigate, useQuery, useURL } from "lib/cbi-react-core";
import orderService from "services/orderService";
import { FILTER_ORDER_CANCELLED, FILTER_ORDER_PAID, FILTER_ORDER_WAIT_CONFIRM } from "constant/filter";
import { MY_ORDER_LIMIT } from "constant";
import { generateMyOrderDetailPath } from "routers/params";
// import "./style.scss"

const columnsOrder: ColumnProps<Order> = [
    {
        // index: "id",
        title: "Order ID",
        render: (item) => (
            <p data-orderid={item.id} className="bold orderId">
                {item.id?.slice(-12)}
            </p>
        )
    },
    {
        title: "Product",
        render: (item) => (
            <div>
                {item.items.map((e) => (
                    <Typography key={e.id} className="text-18">
                        {e.name}
                    </Typography>
                ))}
            </div>
        ),
    },
    {
        title: "Purchase date",
        render: (item) => (
            <div>
                {item.payments.map((e) => (
                    <Typography key={e.id} className="text-18">
                        {moment(e.completedAt).format("MMM DD, YYYY HH:mm")}
                    </Typography>
                ))}
            </div>
        ),
    },
    {
        title: "Grand Total Purchase",
        render: (item) => (
            <div>
                {item.prices.map((e) => {
                    if (e.key === "totalPayable") {
                        return (
                            <Typography key={e.id} className="text-18">
                                {currency(e.value)}
                            </Typography>
                        );
                    }
                })}
            </div>
        ),
    },
    {
        title: "Items Qty",
        render: (item) => <div>{item.items.length}</div>,
    },
    {
        title: "Payment Method",
        render: (item) => <div>{item.payments.map((e) => (<span key={e.id}>{e.methodCode}</span>))}</div>,
    },
];

type QueryURL = {
    filter: 'wfc' | 'paid' | 'cancel'
    page: string
}

const MyOrder = () => {
    // const dispatch = useDispatch();
    // const { orderWaitConfirm, orderPaid, orderCancelled } = useOrder();
    // const [tab, setTab] = useState("wfc");
    // const [columns, setColumns] = useState<ColumnProps<Order>>(columnsOrder)
    // const history = useHistory()
    // const router = useRouteMatch()

    // useEffect(() => {
    //     let page = '0'
    //     if(history.location.search){
    //         const query = Object.fromEntries(new URLSearchParams(history.location.search))
    //         page = ((Number(query.page) -1) * 10 ).toString()
    //     }
    //     if (tab === 'wfc') {
    //         dispatch(orderActions.getOrderWaitConfirm({
    //             page
    //         }));}
    //     if(tab === 'paid'){
    //         dispatch(orderActions.getOrderPaid({
    //             page
    //         }));

    //     }
    //     if(tab === 'cancel'){
    //         dispatch(orderActions.getOrderCancelled({
    //             page
    //         }));
    //     }
    // }, [tab]);

    // useEffect(() => {
    //     if (tab === 'wfc') {
    //         const cls = [...columns]
    //         const index = cls.findIndex(item => item.title === "Purchase date")
    //         cls.splice(index, 1)
    //         setColumns(cls)
    //     } else {
    //         setColumns(columnsOrder)
    //     }
    // }, [tab])



    //click vào tr của table thì push đến trang detail
    // useEffect(() => {
    //     const els = document.querySelectorAll('.orderId') // class thẻ td orderid của table sau render.
    //     els.forEach(item => {
    //         const e = item.closest('tr')
    //         const orderId = item.getAttribute('data-orderid')
    //         if (e && orderId) e.onclick = () => history.push(generatePath(router.myOrderDetail, { id: orderId }))
    //     })
    // }, [orderWaitConfirm, orderPaid, orderCancelled])

    const { query } = useURL<QueryURL>()
    const navigate = useNavigate()
    if (!query.filter) query.filter = 'wfc'
    let filter: any = FILTER_ORDER_CANCELLED // eslint-disable-line
    switch (query.filter) {
        case 'paid':
            filter = FILTER_ORDER_PAID
            break;
        case 'wfc':
            filter = FILTER_ORDER_WAIT_CONFIRM
    }


    const { data, isFetching } = useQuery(() => orderService.getOrders({
        ...filter,
        limit: MY_ORDER_LIMIT,
        offset: (parseInt(query.page || '1') - 1) * MY_ORDER_LIMIT
    }), [query.page, filter])

    const { data: count } = useQuery(() => orderService.getCount({
        ...filter,
    }), [filter])

    return (
        <div className="myOrder">
            <AccountDataListTemplate
                breadcrumns={[
                    <BreadcrumbItem to={router.home}>Home</BreadcrumbItem>,
                    <BreadcrumbItem to="#">My Orders</BreadcrumbItem>,
                ]}
                title="My Orders"
                filter={[
                    { title: 'Wait For Confirmation', key: "wfc" },
                    { title: 'Paid', key: "paid" },
                    { title: 'Cancelled', key: "cancelled" },
                    // <Button
                    //     transparent={query.tab !== "wfc"}
                    //     size="small"
                    //     minWidth={140}
                    //     onClick={() => updateQuery({ tab: 'wfc', page: 1 })}
                    // >
                    //     Wait For Confirmation
                    // </Button>,
                    // <Button
                    //     size="small"
                    //     transparent={query.tab !== "paid"}
                    //     minWidth={140}
                    //     onClick={() => updateQuery({ tab: 'paid', page: 1 })}
                    // >
                    //     Paid
                    // </Button>,
                    // <Button
                    //     transparent={query.tab !== "cancel"}
                    //     size="small"
                    //     minWidth={140}
                    //     onClick={() => updateQuery({ tab: 'cancel', page: 1 })}

                    // >
                    //     Cancelled
                    // </Button>,
                ]}
                tableProp={{
                    columns: columnsOrder,
                    data: data?.data || [],
                    loading: isFetching,
                    trClick: item => navigate(generateMyOrderDetailPath({ id: item.id }))
                }}
                totalPage={Math.ceil((count?.data?.totalCount || 0) / MY_ORDER_LIMIT)}
                noData={
                    <div className="flex-col gap-30">
                        <NoData /> <Button link={router.package}>Continue Purchasing</Button>
                    </div>
                }
            />
        </div>
    )
};

MyOrder.getLayout = getMainLayout

export default MyOrder;
