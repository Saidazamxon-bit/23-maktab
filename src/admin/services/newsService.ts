export interface NewsArticle {
  id: string
  title: string
  category: string
  content: string
  image: string
  date: string
  published: boolean
  author?: string
}

// Initial news data
const initialNews: NewsArticle[] = [
  {
    id: '1',
    title: 'O\'quvchilarimiz viloyat olimpiadasida yuqori natija qayd etdi',
    category: 'Yutuqlar',
    content: 'Maktabimizning o\'quvchilari viloyat olimpiadasida ajoyib natijalar ko\'rsatdiler...',
    image: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=900&q=80',
    date: '2026-09-24',
    published: true,
  },
  {
    id: '2',
    title: 'Yangi o\'quv yilining ochilish marosimi bo\'lib o\'tdi',
    category: 'Tadbir',
    content: 'Bugun bizning maktabda yangi o\'quv yilining ochilish marosimi bo\'lib o\'tdi...',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    date: '2026-09-10',
    published: true,
  },
  {
    id: '3',
    title: 'Maktabimiz jamoasi shahar spartakiadasida qatnashdi',
    category: 'Sport',
    content: 'Maktabimizning sporchi jamoasi shahar spartakiadasida faol qatnashib...',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80',
    date: '2026-09-04',
    published: true,
  },
]

class NewsService {
  private news: NewsArticle[] = initialNews

  async getAll(onlyPublished = true): Promise<NewsArticle[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = onlyPublished ? this.news.filter((n) => n.published) : this.news
        resolve(filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      }, 100)
    })
  }

  async getById(id: string): Promise<NewsArticle | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.news.find((n) => n.id === id) || null)
      }, 100)
    })
  }

  async create(article: Omit<NewsArticle, 'id'>): Promise<NewsArticle> {
    const newArticle: NewsArticle = {
      ...article,
      id: `news_${Date.now()}`,
    }
    this.news.push(newArticle)
    return new Promise((resolve) => setTimeout(() => resolve(newArticle), 100))
  }

  async update(id: string, updates: Partial<NewsArticle>): Promise<NewsArticle | null> {
    const index = this.news.findIndex((n) => n.id === id)
    if (index === -1) return null

    const updated = { ...this.news[index], ...updates }
    this.news[index] = updated

    return new Promise((resolve) => setTimeout(() => resolve(updated), 100))
  }

  async delete(id: string): Promise<boolean> {
    const index = this.news.findIndex((n) => n.id === id)
    if (index === -1) return false

    this.news.splice(index, 1)
    return new Promise((resolve) => setTimeout(() => resolve(true), 100))
  }

  async search(query: string): Promise<NewsArticle[]> {
    const filtered = this.news.filter(
      (n) =>
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.content.toLowerCase().includes(query.toLowerCase())
    )
    return new Promise((resolve) => setTimeout(() => resolve(filtered), 100))
  }
}

export const newsService = new NewsService()
