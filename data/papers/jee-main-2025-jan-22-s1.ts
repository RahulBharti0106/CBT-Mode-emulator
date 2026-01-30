import { Exam, QuestionType } from '../../types';

export const EXAM_DATA: Exam = {
  id: 'jee-main-2025-jan-22-s1',
  name: 'JEE Main 2025 (22 Jan Shift 1)',
  durationMinutes: 180,
  subjects: [
    {
      id: 'sub-math',
      name: 'Mathematics',
      sections: [
        {
          id: 'sec-math-a',
          name: 'Section A',
          type: QuestionType.MCQ,
          subjectId: 'sub-math',
          questions: [
            {
              id: 'q-math-1',
              text: 'Let $a_1, a_2, a_3, \\dots$ be a G.P. of increasing positive terms. If $a_1 a_5 = 28$ and $a_2 + a_4 = 29$, then $a_6$ is equal to:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 0,
              options: [
                { id: 'opt-math-1-1', text: '628' },
                { id: 'opt-math-1-2', text: '812' },
                { id: 'opt-math-1-3', text: '526' },
                { id: 'opt-math-1-4', text: '784', isCorrect: true }
              ]
            },
            {
              id: 'q-math-2',
              text: 'Let $x = x(y)$ be the solution of the differential equation $y^2 dx + (x - \\frac{1}{y}) dy = 0$. If $x(1) = 1$, then $x(\\frac{1}{2})$ is:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 1,
              options: [
                { id: 'opt-math-2-1', text: '$\\frac{1}{2} + e$' },
                { id: 'opt-math-2-2', text: '$3 + e$' },
                { id: 'opt-math-2-3', text: '$3 - e$', isCorrect: true },
                { id: 'opt-math-2-4', text: '$\\frac{3}{2} + e$' }
              ]
            },
            {
              id: 'q-math-3',
              text: 'Two balls are selected at random one by one without replacement from a bag containing 4 white and 6 black balls. If the probability that the first selected ball is black, given that the second selected ball is also black, is $\\frac{m}{n}$, where $\\text{gcd}(m, n) = 1$, then $m + n$ is equal to:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 2,
              options: [
                { id: 'opt-math-3-1', text: '4' },
                { id: 'opt-math-3-2', text: '14', isCorrect: true },
                { id: 'opt-math-3-3', text: '13' },
                { id: 'opt-math-3-4', text: '11' }
              ]
            },
            {
              id: 'q-math-4',
              text: 'The product of all solutions of the equation $e^{5(\\log_e x)^2 + 3} = x^8, x > 0$, is:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 3,
              options: [
                { id: 'opt-math-4-1', text: '$e^{8/5}$', isCorrect: true },
                { id: 'opt-math-4-2', text: '$e^{6/5}$' },
                { id: 'opt-math-4-3', text: '$e^2$' },
                { id: 'opt-math-4-4', text: '$e$' }
              ]
            },
            {
              id: 'q-math-5',
              text: 'Let the triangle PQR be the image of the triangle with vertices $(1, 3), (3, 1)$ and $(2, 4)$ in the line $x + 2y = 2$. If the centroid of $\\Delta PQR$ is the point $(\\alpha, \\beta)$, then $15(\\alpha - \\beta)$ is equal to:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 4,
              options: [
                { id: 'opt-math-5-1', text: '19' },
                { id: 'opt-math-5-2', text: '24' },
                { id: 'opt-math-5-3', text: '21' },
                { id: 'opt-math-5-4', text: '22', isCorrect: true }
              ]
            },
            {
              id: 'q-math-6',
              text: 'Let for $f(x) = 7 \\tan^8 x + 7 \\tan^6 x - 3 \\tan^4 x - 3 \\tan^2 x$, $I_1 = \\int_{0}^{\\pi/4} f(x)dx$ and $I_2 = \\int_{0}^{\\pi/4} x f(x)dx$. Then $7I_1 + 12I_2$ is equal to:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 5,
              options: [
                { id: 'opt-math-6-1', text: '2' },
                { id: 'opt-math-6-2', text: '1', isCorrect: true },
                { id: 'opt-math-6-3', text: '$2\\pi$' },
                { id: 'opt-math-6-4', text: '$\\pi$' }
              ]
            },
            {
              id: 'q-math-7',
              text: 'Let the parabola $y = x^2 + px - 3$, meet the coordinate axes at the points P, Q and R. If the circle C with centre at $(-1, -1)$ passes through the points $P, Q$ and $R$, then the area of $\\Delta PQR$ is:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 6,
              options: [
                { id: 'opt-math-7-1', text: '7' },
                { id: 'opt-math-7-2', text: '4' },
                { id: 'opt-math-7-3', text: '6', isCorrect: true },
                { id: 'opt-math-7-4', text: '5' }
              ]
            },
            {
              id: 'q-math-8',
              text: 'Let $L_1 : \\frac{x-1}{2} = \\frac{y-2}{3} = \\frac{z-3}{4}$ and $L_2 : \\frac{x-2}{3} = \\frac{y-4}{4} = \\frac{z-5}{5}$ be two lines. Then which of the following points lies on the line of the shortest distance between $L_1$ and $L_2$?',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 7,
              options: [
                { id: 'opt-math-8-1', text: '$(\\frac{14}{3}, -3, \\frac{22}{3})$', isCorrect: true },
                { id: 'opt-math-8-2', text: '$(-\\frac{5}{3}, -7, 1)$' },
                { id: 'opt-math-8-3', text: '$(2, 3, \\frac{1}{3})$' },
                { id: 'opt-math-8-4', text: '$(\\frac{8}{3}, -1, \\frac{1}{3})$' }
              ]
            },
            {
              id: 'q-math-9',
              text: 'Let $f(x)$ be a real differentiable function such that $f(0) = 1$ and $f(x + y) = f(x)f\'(y) + f\'(x)f(y)$ for all $x, y \\in \\mathbb{R}$. Then $\\sum_{n=1}^{100} \\log_e f(n)$ is equal to:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 8,
              options: [
                { id: 'opt-math-9-1', text: '2525', isCorrect: true },
                { id: 'opt-math-9-2', text: '5220' },
                { id: 'opt-math-9-3', text: '2384' },
                { id: 'opt-math-9-4', text: '2406' }
              ]
            },
            {
              id: 'q-math-10',
              text: 'From all the English alphabets, five letters are chosen and are arranged in alphabetical order. The total number of ways, in which the middle letter is \'M\', is:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 9,
              options: [
                { id: 'opt-math-10-1', text: '5148', isCorrect: true },
                { id: 'opt-math-10-2', text: '6084' },
                { id: 'opt-math-10-3', text: '4356' },
                { id: 'opt-math-10-4', text: '14950' }
              ]
            },
            {
              id: 'q-math-11',
              text: 'Using the principal values of the inverse trigonometric functions, the sum of the maximum and the minimum values of $16 ((\\sec^{-1} x)^2 + (\\text{cosec}^{-1} x)^2)$ is:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 10,
              options: [
                { id: 'opt-math-11-1', text: '$24\\pi^2$' },
                { id: 'opt-math-11-2', text: '$22\\pi^2$', isCorrect: true },
                { id: 'opt-math-11-3', text: '$31\\pi^2$' },
                { id: 'opt-math-11-4', text: '$18\\pi^2$' }
              ]
            },
            {
              id: 'q-math-12',
              text: 'Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a twice differentiable function such that $f(x + y) = f(x)f(y)$ for all $x, y \\in \\mathbb{R}$. If $f\'(0) = 4a$ and $f$ satisfies $f\'\'(x) - 3af\'(x) - f(x) = 0, a > 0$, then the area of the region $R = \\{(x, y) \\mid 0 \\le y \\le f(ax), 0 \\le x \\le 2\\}$ is:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 11,
              options: [
                { id: 'opt-math-12-1', text: '$e^2 - 1$', isCorrect: true },
                { id: 'opt-math-12-2', text: '$e^2 + 1$' },
                { id: 'opt-math-12-3', text: '$e^4 + 1$' },
                { id: 'opt-math-12-4', text: '$e^4 - 1$' }
              ]
            },
            {
              id: 'q-math-13',
              text: 'The area of the region, inside the circle $(x - 2\\sqrt{3})^2 + y^2 = 12$ and outside the parabola $y^2 = 2\\sqrt{3}x$ is:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 12,
              options: [
                { id: 'opt-math-13-1', text: '$3\\pi + 8$' },
                { id: 'opt-math-13-2', text: '$6\\pi - 16$', isCorrect: true },
                { id: 'opt-math-13-3', text: '$3\\pi - 8$' },
                { id: 'opt-math-13-4', text: '$6\\pi - 8$' }
              ]
            },
            {
              id: 'q-math-14',
              text: 'Let the foci of a hyperbola be $(1, 14)$ and $(1, -12)$. If it passes through the point $(1, 6)$, then the length of its latus-rectum is:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 13,
              options: [
                { id: 'opt-math-14-1', text: '$\\frac{24}{5}$' },
                { id: 'opt-math-14-2', text: '$\\frac{25}{6}$' },
                { id: 'opt-math-14-3', text: '$\\frac{144}{5}$' },
                { id: 'opt-math-14-4', text: '$\\frac{288}{5}$', isCorrect: true }
              ]
            },
            {
              id: 'q-math-15',
              text: 'If $\\sum_{r=1}^n T_r = \\frac{(2n-1)(2n+1)(2n+3)(2n+5)}{64}$, then $\\lim_{n\\to\\infty} \\sum_{r=1}^n (\\frac{1}{T_r})$ is equal to:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 14,
              options: [
                { id: 'opt-math-15-1', text: '0' },
                { id: 'opt-math-15-2', text: '$\\frac{2}{3}$', isCorrect: true },
                { id: 'opt-math-15-3', text: '1' },
                { id: 'opt-math-15-4', text: '$\\frac{1}{3}$' }
              ]
            },
            {
              id: 'q-math-16',
              text: 'A coin is tossed three times. Let $X$ denote the number of times a tail follows a head. If $\\mu$ and $\\sigma^2$ denote the mean and variance of $X$, then the value of $64(\\mu + \\sigma^2)$ is:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 15,
              options: [
                { id: 'opt-math-16-1', text: '51' },
                { id: 'opt-math-16-2', text: '64' },
                { id: 'opt-math-16-3', text: '32' },
                { id: 'opt-math-16-4', text: '48', isCorrect: true }
              ]
            },
            {
              id: 'q-math-17',
              text: 'The number of non-empty equivalence relations on the set $\\{1, 2, 3\\}$ is:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 16,
              options: [
                { id: 'opt-math-17-1', text: '6' },
                { id: 'opt-math-17-2', text: '5', isCorrect: true },
                { id: 'opt-math-17-3', text: '7' },
                { id: 'opt-math-17-4', text: '4' }
              ]
            },
            {
              id: 'q-math-18',
              text: 'A circle $C$ of radius 2 lies in the second quadrant and touches both the coordinate axes. Let $r$ be the radius of a circle that has centre at the point $(2, 5)$ and intersects the circle $C$ at exactly two points. If the set of all possible values of r is the interval $(\\alpha, \\beta)$, then $3\\beta - 2\\alpha$ is equal to:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 17,
              options: [
                { id: 'opt-math-18-1', text: '10' },
                { id: 'opt-math-18-2', text: '15', isCorrect: true },
                { id: 'opt-math-18-3', text: '12' },
                { id: 'opt-math-18-4', text: '14' }
              ]
            },
            {
              id: 'q-math-19',
              text: 'Let $A = \\{1, 2, 3, \\dots, 10\\}$ and $B = \\{\\frac{m}{n} : m, n \\in A, m < n \\text{ and } \\text{gcd}(m, n) = 1\\}$. Then $n(B)$ is equal to:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 18,
              options: [
                { id: 'opt-math-19-1', text: '36' },
                { id: 'opt-math-19-2', text: '31', isCorrect: true },
                { id: 'opt-math-19-3', text: '37' },
                { id: 'opt-math-19-4', text: '29' }
              ]
            },
            {
              id: 'q-math-20',
              text: 'Let $z_1, z_2$ and $z_3$ be three complex numbers on the circle $|z| = 1$ with $\\text{arg}(z_1) = -\\frac{\\pi}{4}, \\text{arg}(z_2) = 0$ and $\\text{arg}(z_3) = \\frac{\\pi}{4}$. If $|z_1 \\bar{z}_2 + z_2 \\bar{z}_3 + z_3 \\bar{z}_1|^2 = \\alpha + \\beta\\sqrt{2}, \\alpha, \\beta \\in \\mathbb{Z}$, then the value of $\\alpha^2 + \\beta^2$ is:',
              type: QuestionType.MCQ,
              sectionId: 'sec-math-a',
              subjectId: 'sub-math',
              orderIndex: 19,
              options: [
                { id: 'opt-math-20-1', text: '24' },
                { id: 'opt-math-20-2', text: '29', isCorrect: true },
                { id: 'opt-math-20-3', text: '41' },
                { id: 'opt-math-20-4', text: '31' }
              ]
            }
          ]
        },
        {
          id: 'sec-math-b',
          name: 'Section B',
          type: QuestionType.NUMERIC,
          subjectId: 'sub-math',
          questions: [
            {
              id: 'q-math-21',
              text: 'Let $A$ be a square matrix of order 3 such that $\\det(A) = -2$ and $\\det(3 \\text{adj}(-6 \\text{adj}(3A))) = 2^{m+n} \\cdot 3^{mn}, m > n$. Then $4m + 2n$ is equal to:',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-math-b',
              subjectId: 'sub-math',
              orderIndex: 20,
              correctValue: 34
            },
            {
              id: 'q-math-22',
              text: 'If $\\sum_{r=0}^5 \\frac{^{11}C_{2r}}{2r+2} = \\frac{m}{n}, \\text{gcd}(m, n) = 1$, then $m - n$ is equal to:',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-math-b',
              subjectId: 'sub-math',
              orderIndex: 21,
              correctValue: 2035
            },
            {
              id: 'q-math-23',
              text: 'Let $\\vec{c}$ be the projection vector of $\\vec{b} = \\lambda \\hat{i} + 4\\hat{k}, \\lambda > 0$, on the vector $\\vec{a} = \\hat{i} + 2\\hat{j} + 2\\hat{k}$. If $|\\vec{a} + \\vec{c}| = 7$, then the area of the parallelogram formed by the vectors $\\vec{b}$ and $\\vec{c}$ is:',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-math-b',
              subjectId: 'sub-math',
              orderIndex: 22,
              correctValue: 16
            },
            {
              id: 'q-math-24',
              text: 'Let the function, $f(x) = \\begin{cases} -3ax^2 - 2, & x < 1 \\\\ a^2 + bx, & x \\ge 1 \\end{cases}$ be differentiable for all $x \\in \\mathbb{R}$, where $a > 1, b \\in \\mathbb{R}$. If the area of the region enclosed by $y = f(x)$ and the line $y = -20$ is $\\alpha + \\beta\\sqrt{3}, \\alpha, \\beta \\in \\mathbb{Z}$, then the value of $\\alpha + \\beta$ is:',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-math-b',
              subjectId: 'sub-math',
              orderIndex: 23,
              correctValue: 34
            },
            {
              id: 'q-math-25',
              text: 'Let $L_1 : \\frac{x-1}{3} = \\frac{y-1}{-1} = \\frac{z+1}{0}$ and $L_2 : \\frac{x-2}{2} = \\frac{y}{0} = \\frac{z+4}{\\alpha}, \\alpha \\in \\mathbb{R}$, be two lines, which intersect at the point $B$. If $P$ is the foot of perpendicular from the point $A(1, 1, -1)$ on $L_2$, then the value of $26\\alpha(PB)^2$ is:',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-math-b',
              subjectId: 'sub-math',
              orderIndex: 24,
              correctValue: 216
            }
          ]
        }
      ]
    },
    {
      id: 'sub-phy',
      name: 'Physics',
      sections: [
        {
          id: 'sec-phy-a',
          name: 'Section A',
          type: QuestionType.MCQ,
          subjectId: 'sub-phy',
          questions: [
            {
              id: 'q-phy-26',
              text: 'An electron is made to enter symmetrically between two parallel and equally but oppositely charged metal plates, each of 10 cm length. The electron emerges out of the electric field region with a horizontal component of velocity $10^6$ m/s. If the magnitude of the electric field between the plates is 9.1 V/cm, then the vertical component of velocity of electron is (mass of electron $= 9.1 \\times 10^{-31}$ kg and charge of electron $= 1.6 \\times 10^{-19}$ C):',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 25,
              options: [
                { id: 'opt-phy-26-1', text: '0' },
                { id: 'opt-phy-26-2', text: '$1 \\times 10^6$ m/s' },
                { id: 'opt-phy-26-3', text: '$16 \\times 10^6$ m/s', isCorrect: true },
                { id: 'opt-phy-26-4', text: '$16 \\times 10^4$ m/s' }
              ]
            }
          ]
        }
      ]
    }
  ]
};