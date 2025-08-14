interface RemoveItem {
  id: number;
  success?: boolean;
}

export interface RemoveItemRequest extends RemoveItem {
  type: string;
}

export interface RemoveItemResponse extends RemoveItem {
  callback: string;
}
