export interface AuthorAPIType {
    id: string
    name: string
}

export interface CommentAPIType {
    id: string
    text: string
    author: AuthorAPIType
}

export interface PostAPIType {
    id: string
    text: string
    likes: number
    author: AuthorAPIType
    lastComments: CommentAPIType[]
}

const array: PostAPIType[] = [
    {
        id: 'id1',
        text: 'hello my dear',
        likes: 10,
        author: {id: 'authorId3', name: 'Sergio'},
        lastComments: [
            {id: '998', text: 'cool', author: {id: 'authorId3', name: 'Sergio'}},
            {id: '997', text: 'root', author: {id: 'authorId2', name: 'Evangelist'}},
            {id: '996', text: 'bool', author: {id: 'authorId1', name: 'Yana'}}
        ]
    },
    {
        id: 'id2',
        text: 'glory ukraine',
        likes: 12,
        author: {id: 'authorId2', name: 'Evangelist'},
        lastComments: []
    },
    {
        id: 'id3',
        text: 'the neighbourhood',
        likes: 212,
        author: {id: 'authorId3', name: 'Sergio'},
        lastComments: [
            {id: '298', text: 'cool', author: {id: 'authorId4', name: 'Hinata'}},
            {id: '297', text: 'root', author: {id: 'authorId5', name: 'Ricardo'}},
        ]
    },
]

export const api = {
    getPosts(): Promise<PostAPIType[]> {
        return new Promise((res) => {
            setTimeout(() => {
                res(array)
            }, 2000)
        })
    },
    updatePost(postId: string, text: string) {
        return new Promise((res) => {
            setTimeout(() => {
                res(array.map(el => el.id === postId ? {...el, text: text} : el))
            }, 1000)
        })
    },
    updateAuthorName(authorId: string, name: string) {
        return new Promise((res) => {
            setTimeout(() => {
                res(array.map(el => el.author.id === authorId ? {...el, name: name} : el))
            }, 1000)
        })
    },
    getComments(postId: string) {
        return new Promise((res) => {
            setTimeout(() => {
                res([
                    {id: '998', text: 'cool', author: {id: 'authorId3', name: 'Sergio'}},
                    {id: '997', text: 'root', author: {id: 'authorId2', name: 'Evangelist'}},
                    {id: '996', text: 'bool', author: {id: 'authorId1', name: 'Yana'}}
                ])
            }, 1000)
        })
    }
}


