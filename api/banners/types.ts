export type FetchBannersPayload = {
    id: string;
    from: string | Date;
    to: string | Date;
}

export interface InAppBanner {
    banner_id: string;
    id: string;
    title: string;
    image_url: string;
    content: string;
    action_url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  }