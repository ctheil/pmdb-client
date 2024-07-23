class LikedNode<T> {
  val: T
  next: LikedNode<T> | null

  constructor(val: T) {
    this.val = val
    this.next = null
  }

}
export class Liked<T> {
  head: LikedNode<T> | null
  length: number

  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(val: T) {
    var node = new LikedNode(val)
    if (!this.head) {
      this.head = node
      return
    }
    node.next = this.head;
    this.head = node;
  }
  peek(): T | undefined {
    return this.head?.val || undefined
  }

  build(titles: T[]) {
    if (titles.length < 1) {
      return;
    }
    for (let i = titles.length - 1; i >= 0; i--) {
      this.add(titles[i])
    }
  }
}

export class User {
  liked_titles: Liked<number>
  username: string

  constructor(username: string, liked_titles: number[] = []) {
    this.username = username
    this.liked_titles = new Liked()
    this.liked_titles.build(liked_titles);
  }

  append_title(title_id: number) {
    this.liked_titles.add(title_id)
  }
}
