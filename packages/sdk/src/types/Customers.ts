// Legacy code
export interface SimpleCustomer {
	id: string
	name?: string
	email?: string
	source_id?: string
	metadata?: Record<string, any>
	object: 'customer'
}

export interface CustomerObject {
	id: string
	source_id?: string
	name?: string
	email?: string
	phone?: string
	description?: string
	address: {
		city?: string
		state?: string
		line_1?: string
		line_2?: string
		country?: string
		postal_code?: string
	}
	summary: {
		redemptions: {
			total_redeemed: number
			total_failed: number
			total_succeeded: number
			total_rolled_back: number
			total_rollback_failed: number
			total_rollback_succeeded: number
			gift?: {
				redeemed_amount: number
				amount_to_go: number
			}
			loyalty?: {
				redeemed_points: number
				points_to_go: number
			}
		}
		orders: {
			total_amount: number
			total_count: number
			average_amount: number
			last_order_amount: number
			last_order_date?: string
		}
	}
	loyalty: {
		points: number
		referred_customers: number
		campaigns?: Record<
			string,
			{
				points: number
				referred_customers: number
			}
		>
	}
	metadata: Record<string, any>
	created_at: string
	object: 'customer'
}

export type CustomerUnconfirmed = Pick<CustomerObject, 'summary' | 'email' | 'loyalty'> & {
	object: 'unconfirmed_customer'
}
export interface CustomerRequest {
	id?: string
	source_id?: string
	name?: string
	email?: string
	metadata?: Record<string, any>
	description?: string
	address?: {
		city?: string
		state?: string
		line_1?: string
		line_2?: string
		country?: string
		postal_code?: string
	}
	phone?: string
}

export interface CustomersCommonListRequest {
	limit?: number
	page?: number
	email?: string
	city?: string
	name?: string
	order?: 'created_at' | '-created_at'
	starting_after?: Date | string
}

export interface CustomersCommonListResponse {
	object: 'list'
	total: number
	data_ref: 'customers'
	customers: CustomerObject[]
	has_more?: boolean
}

export interface CustomerActivitiesListQueryParams {
	limit?: number
	order?: 'created_at' | '-created_at'
	starting_after?: string
	starting_after_id?: string
	campaign_type?: 'LOYALTY_PROGRAM' | 'PROMOTION' | 'DISCOUNT_COUPONS' | 'GIFT_VOUCHERS' | 'REFERRAL_PROGRAM'
	campaign_id?: string
}

export interface CustomerActivitiesListResponse {
	object: 'list'
	total: number
	data_ref: 'data'
	data: Record<string, any>[]
}

export type CustomersCreateBody = CustomerRequest
export type CustomersCreateResponse = CustomerObject | CustomerUnconfirmed

export type CustomersGetResponse = CustomerObject | CustomerUnconfirmed

export type CustomersListParams = CustomersCommonListRequest
export type CustomersListResponse = CustomersCommonListResponse

export type CustomersScrollParams = CustomersCommonListRequest
export type CustomersScrollResponse = CustomersCommonListResponse
export type CustomersScrollYield = CustomerObject

type IdOrSourceId = { id: string } | { source_id: string }
export type CustomersUpdateParams = CustomerRequest & IdOrSourceId

export type CustomersUpdateResponse = CustomerObject | CustomerUnconfirmed

export type CustomersUpdateConsentsBody = Record<string, boolean>

// New types following guideline

// Domain types

type CustomerBase = {
	name?: string | null
	description?: string | null
	email?: string | null
	phone?: string | null
	birthdate?: string | null
	metadata?: Record<string, unknown> | null
}

type CustomerAddress = {
	address?: {
		city?: string | null
		state?: string | null
		line_1?: string | null
		line_2?: string | null
		country?: string | null
		postal_code?: string | null
	} | null
}

// 0-level types

export type CustomersUpdateInBulkRequestBody = (CustomerBase &
	CustomerAddress & {
		source_id: string | null
	})[]

export interface CustomersUpdateMetadataInBulkRequestBody {
	source_ids: string[]
	metadata: Record<string, unknown>
}
export interface CustomersDeletePermanentlyResponseBody {
	id: string
	created_at: string
	related_object_id: string
	related_object: 'customer'
	status: 'DONE'
	data_json: {
		events: number
		customer_events: number
		daily_events: number
		segments: number
		orders: number
		order_events: number
		customer: 1
	}
	object: 'pernament_deletion'
}
