// Names, posts and numbers copied verbatim from the requirements PDF, in order.
// "GS = General Secretary"
// TODO(Q15): three numbers have the wrong length in the source (Rishabh Setia,
// Malyank Verma, Jayesh Mahajan). Kept as given.
// TODO(Q16): departments and photos not supplied.

export const COUNCIL_TERMS = [
  { id: 'current', label: 'Current Council' },
  { id: '2025-26', label: '2025–26' },
  { id: '2024-25', label: '2024–25' },
  { id: '2023-24', label: '2023–24' },
  { id: 'earlier', label: 'Earlier Councils' },
]

const member = (name, post, phone) => ({ name, post, phone, department: null, photo: null })

export const COUNCILS = {
  current: [
    member('Sreenived Ajith', 'Hall President', '9947884397'),
    member('Aryan Singh', 'Second Senate Member', '7033338703'),
    member('Richard MB', 'GS Alumni Affairs', '9846312018'),
    member('Rishabh Setia', 'GS Technology Affairs', '750367974'),
    member('Malyank Verma', 'GS Technology Affairs', '8278102'),
    member('Eklavya Joshi', 'GS Sports & Games', '9620037671'),
    member('Pawan Bishnoi', 'GS Sports & Games', '8824884095'),
    member('Deepak Saran', 'GS Social & Cultural', '8302218150'),
    member('Dhruv Sharma', 'GS Social & Cultural', '9315170941'),
    member('Ashank Ankur Vermani', 'GS Maintenance', '7977391540'),
    member('Sanyam Kumar', 'GS Maintenance', '9319533782'),
    member('Sarthak Sonawane', 'GS Mess', '7972420051'),
    member('Sahil', 'GS Mess', '7728851493'),
    member('Subham Meena', "GS Students' Welfare", '6378004087'),
    member('Jayesh Mahajan', "GS Students' Welfare", '91309228'),
  ],
  // TODO(Q16): past councils not supplied.
}

export const TOP_POSTS = ['Hall President', 'Second Senate Member']

export function designation(post) {
  return post.replace(/^GS /, 'General Secretary, ')
}
