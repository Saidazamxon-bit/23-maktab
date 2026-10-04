export interface GalleryImage {
  id: string
  title: string
  image: string
  displayOrder: number
  featured: boolean
}

const initialGallery: GalleryImage[] = [
  {
    id: '1',
    title: 'Zamonaviy sinfxonalar',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 1,
    featured: true,
  },
  {
    id: '2',
    title: 'Bizning o\'quvchilar',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 2,
    featured: false,
  },
  {
    id: '3',
    title: 'Ustozlarimiz',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 3,
    featured: false,
  },
  {
    id: '4',
    title: 'Maktab tadbirlari',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3d3f0f0?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 4,
    featured: false,
  },
  {
    id: '5',
    title: 'Sport va faoliyat',
    image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 5,
    featured: false,
  },
]

class GalleryService {
  private gallery: GalleryImage[] = initialGallery

  async getAll(): Promise<GalleryImage[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.gallery.sort((a, b) => a.displayOrder - b.displayOrder))
      }, 100)
    })
  }

  async getById(id: string): Promise<GalleryImage | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.gallery.find((g) => g.id === id) || null)
      }, 100)
    })
  }

  async create(image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> {
    const newImage: GalleryImage = {
      ...image,
      id: `gallery_${Date.now()}`,
    }
    this.gallery.push(newImage)
    return new Promise((resolve) => setTimeout(() => resolve(newImage), 100))
  }

  async update(id: string, updates: Partial<GalleryImage>): Promise<GalleryImage | null> {
    const index = this.gallery.findIndex((g) => g.id === id)
    if (index === -1) return null

    const updated = { ...this.gallery[index], ...updates }
    this.gallery[index] = updated

    return new Promise((resolve) => setTimeout(() => resolve(updated), 100))
  }

  async delete(id: string): Promise<boolean> {
    const index = this.gallery.findIndex((g) => g.id === id)
    if (index === -1) return false

    this.gallery.splice(index, 1)
    return new Promise((resolve) => setTimeout(() => resolve(true), 100))
  }

  async reorder(items: GalleryImage[]): Promise<GalleryImage[]> {
    this.gallery = items.sort((a, b) => a.displayOrder - b.displayOrder)
    return new Promise((resolve) => setTimeout(() => resolve(this.gallery), 100))
  }
}

export const galleryService = new GalleryService()
