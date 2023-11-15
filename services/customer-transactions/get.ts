export type CustomerTransactionListItem = {
	id: string
	customer_id: string
	customer_name: string
	customer_phone: string
	listing_id: string
	listing_category: string
	listing_name: string
	date: string
	qty: number
	room_id: string
	room_name: string
	room_price: number
	payment_type: 'CASH' | 'CREDIT'
	dp: number
	total_price: number
	pic: string
}
