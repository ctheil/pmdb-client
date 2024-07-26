import { Title } from "./title";

class QueueNode<T> {
  val: T
  next: QueueNode<T> | null
  constructor(val: T) {
    this.val = val
    this.next = null
  }
}
class Queue<T> {
  head: QueueNode<T> | null
  tail: QueueNode<T> | null
  length: number

  constructor() {
    this.head = this.tail = null;
    this.length = 0;
  }

  enqueue(item: T) {
    this.length++
    var node = new QueueNode(item);
    if (!this.head || !this.tail) {
      this.head = this.tail = node;
      return;
    }
    this.tail.next = node;
    this.tail = node;
  }

  dequeue(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    this.length--;
    var out = this.head.val
    this.head = this.head.next
    return out;
  }

  peek(): T | undefined {
    return this.head?.val || undefined
  }
}

export default class CardStack {
  private data: Title[]
  queue: Queue<Title>
  liked: { [key: number]: boolean }
  disliked: { [key: number]: boolean }
  user_list: Queue<Title>

  constructor(data: Title[]) {
    this.data = data
    this.queue = new Queue();
    this.user_list = new Queue();
    this.liked = {};
    this.disliked = {};

    this.init_queue();
  }

  private init_queue() {
    for (let d of this.data) {
      this.queue.enqueue(d)
    }
  }

  like(): Title | undefined {
    var title = this.queue.dequeue();
    if (!title) return undefined

    this.liked[title.id] = true
    return title;
  }
  dislike(): Title | undefined {
    var title = this.queue.dequeue();
    if (!title) return undefined

    this.disliked[title.id] = true
    return title;
  }
  enlist(like: boolean = false): Title | undefined {
    var title = this.queue.dequeue()
    if (!title) return undefined

    this.user_list.enqueue(title)
    if (like) this.liked[title.id] = true
    return title
  }
  peek(): Title | undefined {
    return this.queue.peek()
  }
  peek_next(): Title | undefined {
    return this.queue.head?.next?.val || undefined
  }
}
