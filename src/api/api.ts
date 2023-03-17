const array = [
    {
        id: 'id1',
        text: 'hello my dear',
        likes: 10,
        author: {id:'authorId1',name:'Eva'}
    },
    {
        id: 'id2',
        text: 'glory ukraine',
        likes: 12,
        author: {id:'authorId2',name:'Evangelist'}
    },
    {
        id: 'id3',
        text: 'the neighbourhood',
        likes: 212,
        author: {id:'authorId3',name:'Sergio'}
    },
]

export interface AuthorType {
    id: string
    name: string
}

export interface PostType {
    id: string
    text: string
    likes: number
    author: AuthorType
}

export const api = {
    getPosts(): Promise<PostType[]> {
        return new Promise((res) => {
            setTimeout(() => {
                res(array)
            }, 2000)
        })
    },
    updatePost(postId: string, text: string) {
        return new Promise((res) => {
            setTimeout(() => {
                res(array.map(el => el.id === postId ? {...el, text: text } : el))
            },2000)
        })
    }
}


