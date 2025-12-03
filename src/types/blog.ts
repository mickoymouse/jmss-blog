export interface Blog {
  _createdAt: string;
  _id: string;
  _updatedAt: string;
  content: any[];
  title: string;
  excerpt?: string;
  slug: {
    _type: string;
    current: string;
  };
}
