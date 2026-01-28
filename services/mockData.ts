import { Exam, QuestionType } from '../types';

export const MOCK_EXAM: Exam = {
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
              orderIndex: 0,
              options: [
                { id: 'opt-phy-26-1', text: '0' },
                { id: 'opt-phy-26-2', text: '$1 \\times 10^6$ m/s' },
                { id: 'opt-phy-26-3', text: '$16 \\times 10^6$ m/s', isCorrect: true },
                { id: 'opt-phy-26-4', text: '$16 \\times 10^4$ m/s' }
              ]
            },
            {
              id: 'q-phy-27',
              text: 'Given below are two statements : Statement-I : The equivalent emf of two nonideal batteries connected in parallel is smaller than either of the two emfs. Statement-II : The equivalent internal resistance of two nonideal batteries connected in parallel is smaller than the internal resistance of either of the two batteries. In the light of the above statements, choose the correct answer from the options given below.',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 1,
              options: [
                { id: 'opt-phy-27-1', text: 'Both Statement-I and Statement-II are false' },
                { id: 'opt-phy-27-2', text: 'Statement-I is false but Statement-II is true', isCorrect: true },
                { id: 'opt-phy-27-3', text: 'Both Statement-I and Statement-II are true' },
                { id: 'opt-phy-27-4', text: 'Statement-I is true but Statement-II is false' }
              ]
            },
            {
              id: 'q-phy-28',
              text: 'A uniform circular disc of radius \'R\' and mass \'M\' is rotating about an axis perpendicular to its plane and passing through its centre. A small circular part of radius R/2 is removed from the original disc as shown in the figure. Find the moment of inertia of the remaining part of the original disc about the axis as given above.',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 2,
              options: [
                { id: 'opt-phy-28-1', text: '$\\frac{7}{32} MR^2$' },
                { id: 'opt-phy-28-2', text: '$\\frac{9}{32} MR^2$' },
                { id: 'opt-phy-28-3', text: '$\\frac{17}{32} MR^2$' },
                { id: 'opt-phy-28-4', text: '$\\frac{13}{32} MR^2$', isCorrect: true }
              ]
            },
            {
              id: 'q-phy-29',
              text: 'An amount of ice of mass $10^{-3}$ kg and temperature $-10^\\circ$C is transformed to vapour of temperature $110^\\circ$C by applying heat. The total amount of work required for this conversion is (Take specific heat of ice = 2100 Jkg$^{-1}$K$^{-1}$, specific heat of water = 4180 Jkg$^{-1}$K$^{-1}$, specific heat of steam = 1920 Jkg$^{-1}$K$^{-1}$, Latent heat of ice = $3.35 \\times 10^5$ Jkg$^{-1}$ and Latent heat of steam = $2.25 \\times 10^6$ Jkg$^{-1}$):',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 3,
              options: [
                { id: 'opt-phy-29-1', text: '3043 J', isCorrect: true },
                { id: 'opt-phy-29-2', text: '3024 J' },
                { id: 'opt-phy-29-3', text: '3003 J' },
                { id: 'opt-phy-29-4', text: '3022 J' }
              ]
            },
            {
              id: 'q-phy-30',
              text: 'An electron in the ground state of the hydrogen atom has the orbital radius of $5.3 \\times 10^{-11}$ m while that for the electron in third excited state is $8.48 \\times 10^{-10}$ m. The ratio of the de Broglie wavelengths of electron in the excited state to that in the ground state is',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 4,
              options: [
                { id: 'opt-phy-30-1', text: '3' },
                { id: 'opt-phy-30-2', text: '16' },
                { id: 'opt-phy-30-3', text: '9' },
                { id: 'opt-phy-30-4', text: '4', isCorrect: true }
              ]
            },
            {
              id: 'q-phy-31',
              text: 'A bob of mass m is suspended at a point O by a light string of length l and left to perform vertical motion (circular) as shown in figure. Initially, by applying horizontal velocity $v_0$ at the point \'A\', the string becomes slack when the bob reaches at the point \'D\'. The ratio of the kinetic energy of the bob at the points B and C is ______.',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 5,
              options: [
                { id: 'opt-phy-31-1', text: '1' },
                { id: 'opt-phy-31-2', text: '2', isCorrect: true },
                { id: 'opt-phy-31-3', text: '4' },
                { id: 'opt-phy-31-4', text: '3' }
              ]
            },
            {
              id: 'q-phy-32',
              text: 'Given is a thin convex lens of glass (refractive index $\\mu$) and each side having radius of curvature R. One side is polished for complete reflection. At what distance from the lens, an object be placed on the optic axis so that the image gets formed on the object itself?',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 6,
              options: [
                { id: 'opt-phy-32-1', text: '$R/\\mu$' },
                { id: 'opt-phy-32-2', text: '$R/(2\\mu - 3)$' },
                { id: 'opt-phy-32-3', text: '$\\mu R$' },
                { id: 'opt-phy-32-4', text: '$R/(2\\mu - 1)$', isCorrect: true }
              ]
            },
            {
              id: 'q-phy-33',
              text: 'Which of the following circuits represents a forward biased diode? Choose the correct answer from the options given below : (Refer to Question Image)',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 7,
              options: [
                { id: 'opt-phy-33-1', text: '(A) and (D) only' },
                { id: 'opt-phy-33-2', text: '(B), (D) and (E) only' },
                { id: 'opt-phy-33-3', text: '(C) and (E) only' },
                { id: 'opt-phy-33-4', text: '(B), (C) and (E) only', isCorrect: true }
              ]
            },
            {
              id: 'q-phy-34',
              text: 'Sliding contact of a potentiometer is in the middle of the potentiometer wire having resistance $R_p = 1\\Omega$ as shown in the figure. An external resistance of $R_e = 2\\Omega$ is connected via the sliding contact. The electric current in the circuit is :',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 8,
              options: [
                { id: 'opt-phy-34-1', text: '0.9 A' },
                { id: 'opt-phy-34-2', text: '1.35 A' },
                { id: 'opt-phy-34-3', text: '0.3 A' },
                { id: 'opt-phy-34-4', text: '1.0 A', isCorrect: true }
              ]
            },
            {
              id: 'q-phy-35',
              text: 'A small point of mass m is placed at a distance 2R from the centre \'O\' of a big uniform solid sphere of mass M and radius R. The gravitational force on \'m\' due to M is $F_1$. A spherical part of radius R/3 is removed from the big sphere as shown in the figure and the gravitational force on m due to remaining part of M is found to be $F_2$. The value of ratio $F_1 : F_2$ is',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 9,
              options: [
                { id: 'opt-phy-35-1', text: '12 : 11', isCorrect: true },
                { id: 'opt-phy-35-2', text: '11 : 10' },
                { id: 'opt-phy-35-3', text: '12 : 9' },
                { id: 'opt-phy-35-4', text: '16 : 9' }
              ]
            },
            {
              id: 'q-phy-36',
              text: 'A closed organ and an open organ tube are filled by two different gases having same bulk modulus but different densities $\\rho_1$ and $\\rho_2$, respectively. The frequency of $9^{th}$ harmonic of closed tube is identical with $4^{th}$ harmonic of open tube. If the length of the closed tube is 10 cm and the density ratio of the gases is $\\rho_1 : \\rho_2 = 1 : 16$, then the length of the open tube is :',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 10,
              options: [
                { id: 'opt-phy-36-1', text: '$\\frac{15}{7}$ cm' },
                { id: 'opt-phy-36-2', text: '$\\frac{20}{7}$ cm' },
                { id: 'opt-phy-36-3', text: '$\\frac{15}{9}$ cm' },
                { id: 'opt-phy-36-4', text: '$\\frac{20}{9}$ cm', isCorrect: true }
              ]
            },
            {
              id: 'q-phy-37',
              text: 'If $B$ is magnetic field and $\\mu_0$ is permeability of free space, then the dimensions of $(B/\\mu_0)$ is',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 11,
              options: [
                { id: 'opt-phy-37-1', text: '$ML^2 T^{-2} A^{-1}$' },
                { id: 'opt-phy-37-2', text: '$MT^{-2} A^{-1}$' },
                { id: 'opt-phy-37-3', text: '$L^{-1} A$', isCorrect: true },
                { id: 'opt-phy-37-4', text: '$LT^{-2} A^{-1}$' }
              ]
            },
            {
              id: 'q-phy-38',
              text: 'A line charge of length \'a\' is kept at the center of an edge BC of a cube ABCDEFGH having edge length \'a\' as shown in the figure. If the density of line charge is $\\lambda$ C per unit length, then the total electric flux through all the faces of the cube will be _____. (Take $\\epsilon_0$ as the free space permittivity)',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 12,
              options: [
                { id: 'opt-phy-38-1', text: '$\\frac{\\lambda a}{2\\epsilon_0}$' },
                { id: 'opt-phy-38-2', text: '$\\frac{\\lambda a}{4\\epsilon_0}$' },
                { id: 'opt-phy-38-3', text: '$\\frac{\\lambda a}{16\\epsilon_0}$' },
                { id: 'opt-phy-38-4', text: '$\\frac{\\lambda a}{8\\epsilon_0}$', isCorrect: true }
              ]
            },
            {
              id: 'q-phy-39',
              text: 'Given below are two statements : Statement I : In a vernier callipers, one vernier scale division is always smaller than one main scale division. Statement II : The vernier constant is given by one main scale division multiplied by the number of vernier scale divisions. In the light of the above statements, choose the correct answer from the options given below.',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 13,
              options: [
                { id: 'opt-phy-39-1', text: 'Statement I is true but Statement II is false' },
                { id: 'opt-phy-39-2', text: 'Statement I is false but Statement II is true' },
                { id: 'opt-phy-39-3', text: 'Both Statement I and Statement II are false', isCorrect: true },
                { id: 'opt-phy-39-4', text: 'Both Statement I and Statement II are true' }
              ]
            },
            {
              id: 'q-phy-40',
              text: 'The work functions of cesium (Cs) and lithium (Li) metals are 1.9 eV and 2.5 eV, respectively. If we incident a light of wavelength 550 nm on these two metal surfaces, then photo-electric effect is possible for the case of',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 14,
              options: [
                { id: 'opt-phy-40-1', text: 'Both Cs and Li' },
                { id: 'opt-phy-40-2', text: 'Neither Cs nor Li' },
                { id: 'opt-phy-40-3', text: 'Cs only', isCorrect: true },
                { id: 'opt-phy-40-4', text: 'Li only' }
              ]
            },
            {
              id: 'q-phy-41',
              text: 'Two spherical bodies of same materials having radii 0.2 m and 0.8 m are placed in same atmosphere. The temperature of the smaller body is 800 K and temperature of the bigger body is 400 K. If the energy radiated from the smaller body is E, the energy radiated from the bigger body is (assume, effect of the surrounding temperature to be negligible),',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 15,
              options: [
                { id: 'opt-phy-41-1', text: '16 E' },
                { id: 'opt-phy-41-2', text: 'E', isCorrect: true },
                { id: 'opt-phy-41-3', text: '64 E' },
                { id: 'opt-phy-41-4', text: '256 E' }
              ]
            },
            {
              id: 'q-phy-42',
              text: 'In the diagram given below, there are three lenses formed. Considering negligible thickness of each of them as compared to $|R_1|$ and $|R_2|$, i.e., the radii of curvature for upper and lower surfaces of the glass lens, the power of the combination is',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 16,
              options: [
                { id: 'opt-phy-42-1', text: '$\\frac{1}{6} (\\frac{1}{|R_1|} - \\frac{1}{|R_2|})$' },
                { id: 'opt-phy-42-2', text: '$-\\frac{1}{6} (\\frac{1}{|R_1|} + \\frac{1}{|R_2|})$' },
                { id: 'opt-phy-42-3', text: '$\\frac{1}{6} (\\frac{1}{|R_1|} + \\frac{1}{|R_2|})$' },
                { id: 'opt-phy-42-4', text: '$-\\frac{1}{6} (\\frac{1}{|R_1|} - \\frac{1}{|R_2|})$', isCorrect: true }
              ]
            },
            {
              id: 'q-phy-43',
              text: 'Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R). Assertion-(A) : If Young\'s double slit experiment is performed in an optically denser medium than air, then the consecutive fringes come closer. Reason-(R) : The speed of light reduces in an optically denser medium than air while its frequency does not change. In the light of the above statements, choose the most appropriate answer from the options given below :',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 17,
              options: [
                { id: 'opt-phy-43-1', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
                { id: 'opt-phy-43-2', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)', isCorrect: true },
                { id: 'opt-phy-43-3', text: '(A) is true but (R) is false' },
                { id: 'opt-phy-43-4', text: '(A) is false but (R) is true' }
              ]
            },
            {
              id: 'q-phy-44',
              text: 'A parallel-plate capacitor of capacitance $40\\mu$ F is connected to a 100 V power supply. Now the intermediate space between the plates is filled with a dielectric material of dielectric constant K = 2. Due to the introduction of dielectric material, the extra charge and the change in the electrostatic energy in the capacitor, respectively, are',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 18,
              options: [
                { id: 'opt-phy-44-1', text: '4 mC and 0.2 J', isCorrect: true },
                { id: 'opt-phy-44-2', text: '8 mC and 2.0 J' },
                { id: 'opt-phy-44-3', text: '2 mC and 0.4 J' },
                { id: 'opt-phy-44-4', text: '2 mC and 0.2 J' }
              ]
            },
            {
              id: 'q-phy-45',
              text: 'Which of the following resistivity ($\\rho$) v/s temperature (T) curves is most suitable to be used in wire bound standard resistors?',
              type: QuestionType.MCQ,
              sectionId: 'sec-phy-a',
              subjectId: 'sub-phy',
              orderIndex: 19,
              options: [
                { id: 'opt-phy-45-1', text: 'Curve (1)' },
                { id: 'opt-phy-45-2', text: 'Curve (2)' },
                { id: 'opt-phy-45-3', text: 'Curve (3)' },
                { id: 'opt-phy-45-4', text: 'Curve (4)', isCorrect: true }
              ]
            }
          ]
        },
        {
          id: 'sec-phy-b',
          name: 'Section B',
          type: QuestionType.NUMERIC,
          subjectId: 'sub-phy',
          questions: [
            {
              id: 'q-phy-46',
              text: 'The driver sitting inside a parked car is watching vehicles approaching from behind with the help of his side view mirror, which is a convex mirror with radius of curvature R = 2 m. Another car approaches him from behind with a uniform speed of 90 km/hr. When the car is at a distance of 24 m from him, the magnitude of the acceleration of the image of the car in the side view mirror is \'a\'. The value of 100a is _______.',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-phy-b',
              subjectId: 'sub-phy',
              orderIndex: 20,
              correctValue: 8
            },
            {
              id: 'q-phy-47',
              text: 'Two soap bubbles of radius 2 cm and 4 cm, respectively, are in contact with each other. The radius of curvature of the common surface, in cm, is ______.',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-phy-b',
              subjectId: 'sub-phy',
              orderIndex: 21,
              correctValue: 4
            },
            {
              id: 'q-phy-48',
              text: 'The position vectors of two 1 kg particles, (A) and (B), are given by $\\vec{r}_A = (\\alpha_1 t^2 \\hat{i} + \\alpha_2 t \\hat{j} + \\alpha_3 t \\hat{k})$ m and $\\vec{r}_B = (\\beta_1 t \\hat{i} + \\beta_2 t^2 \\hat{j} + \\beta_3 t \\hat{k})$ m, respectively; ($\\alpha_1 = 1$ m/s$^2$, $\\alpha_2 = 3$m/s, $\\alpha_3 = 2$ m/s, $\\beta_1 = 2$ m/s, $\\beta_2 = -1$ m/s$^2$, $\\beta_3 = 4$pm/s), where t is time, n and p are constants. At $t = 1$ s, $\\vec{V}_A = |\\vec{V}_B|$ and velocities $\\vec{V}_A$ and $\\vec{V}_B$ of the particles are orthogonal to each other. At $t = 1$ s, the magnitude of angular momentum of particle (A) with respect to the position of particle (B) is $\\sqrt{L}$ kgm$^2$s$^{-1}$. The value of L is ______.',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-phy-b',
              subjectId: 'sub-phy',
              orderIndex: 22,
              correctValue: 90
            },
            {
              id: 'q-phy-49',
              text: 'Three conductors of same length having thermal conductivity $k_1, k_2$ and $k_3$ are connected as shown in figure. Area of cross sections of $1^{st}$ and $2^{nd}$ conductor are same and for $3^{rd}$ conductor it is double of the $1^{st}$ conductor. The temperatures are given in the figure. In steady state condition, the value of $\\theta$ is ______ $^\\circ$C. (Given : $k_1 = 60$Js$^{-1}$ m$^{-1}$ K$^{-1}$, $k_2 = 120$Js$^{-1}$ m$^{-1}$ K$^{-1}$, $k_3 = 135$Js$^{-1}$ m$^{-1}$ K$^{-1}$)',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-phy-b',
              subjectId: 'sub-phy',
              orderIndex: 23,
              correctValue: 40
            },
            {
              id: 'q-phy-50',
              text: 'A particle is projected at an angle of $30^\\circ$ from horizontal at a speed of 60 m/s. The height traversed by the particle in the first second is $h_0$ and height traversed in the last second, before it reaches the maximum height, is $h_1$. The ratio $h_0 : h_1$ is ______ [Take, $g = 10$ m/s$^2$]',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-phy-b',
              subjectId: 'sub-phy',
              orderIndex: 24,
              correctValue: 5
            }
          ]
        }
      ]
    },
    {
      id: 'sub-chem',
      name: 'Chemistry',
      sections: [
        {
          id: 'sec-chem-a',
          name: 'Section A',
          type: QuestionType.MCQ,
          subjectId: 'sub-chem',
          questions: [
            {
              id: 'q-chem-51',
              text: 'Radius of the first excited state of Helium ion is given as : $a_0 \\to$ radius of first stationary state of hydrogen atom.',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 0,
              options: [
                { id: 'opt-chem-51-1', text: '$r = 4a_0$' },
                { id: 'opt-chem-51-2', text: '$r = 2a_0$', isCorrect: true },
                { id: 'opt-chem-51-3', text: '$r = \\frac{a_0}{2}$' },
                { id: 'opt-chem-51-4', text: '$r = \\frac{a_0}{4}$' }
              ]
            },
            {
              id: 'q-chem-52',
              text: 'The incorrect statements regarding geometrical isomerism are : (A) Propene shows geometrical isomerism. (B) Trans isomer has identical atoms/groups on the opposite sides of the double bond. (C) Cis-but-2-ene has higher dipole moment than trans-but-2-ene. (D) 2-methylbut-2-ene shows two geometrical isomers. (E) Trans-isomer has lower melting point than cis isomer. Choose the correct answer from the options given below :',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 1,
              options: [
                { id: 'opt-chem-52-1', text: '(A) and (E) Only' },
                { id: 'opt-chem-52-2', text: '(A), (D) and (E) Only', isCorrect: true },
                { id: 'opt-chem-52-3', text: '(B) and (C) Only' },
                { id: 'opt-chem-52-4', text: '(C), (D) and (E) Only' }
              ]
            },
            {
              id: 'q-chem-53',
              text: 'A liquid when kept inside a thermally insulated closed vessel at $25^\\circ$C was mechanically stirred from outside. What will be the correct option for the following thermodynamic parameters ?',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 2,
              options: [
                { id: 'opt-chem-53-1', text: '$\\Delta U < 0, q = 0, w > 0$' },
                { id: 'opt-chem-53-2', text: '$\\Delta U = 0, q = 0, w = 0$' },
                { id: 'opt-chem-53-3', text: '$\\Delta U > 0, q = 0, w > 0$', isCorrect: true },
                { id: 'opt-chem-53-4', text: '$\\Delta U = 0, q < 0, w > 0$' }
              ]
            },
            {
              id: 'q-chem-54',
              text: 'Which of the following electronegativity order is incorrect?',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 3,
              options: [
                { id: 'opt-chem-54-1', text: 'Mg < Be < B < N' },
                { id: 'opt-chem-54-2', text: 'S < Cl < O < F' },
                { id: 'opt-chem-54-3', text: 'Al < Si < C < N' },
                { id: 'opt-chem-54-4', text: 'Al < Mg < B < N', isCorrect: true }
              ]
            },
            {
              id: 'q-chem-55',
              text: 'Lanthanoid ions with $4f^7$ configuration are : (A) Eu$^{2+}$ (B) Gd$^{3+}$ (C) Eu$^{3+}$ (D) Tb$^{3+}$ (E) Sm$^{2+}$ Choose the correct answer from the options given below :',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 4,
              options: [
                { id: 'opt-chem-55-1', text: '(A) and (D) only' },
                { id: 'opt-chem-55-2', text: '(B) and (C) only' },
                { id: 'opt-chem-55-3', text: '(A) and (B) only', isCorrect: true },
                { id: 'opt-chem-55-4', text: '(B) and (E) only' }
              ]
            },
            {
              id: 'q-chem-56',
              text: 'Given below are two statements : Statement I : One mole of propyne reacts with excess of sodium to liberate half a mole of H$_2$ gas. Statement II : Four g of propyne reacts with NaNH$_2$ to liberate NH$_3$ gas which occupies 224 mL at STP. In the light of the above statements, choose the most appropriate answer from the options given below:',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 5,
              options: [
                { id: 'opt-chem-56-1', text: 'Statement I is incorrect but Statement II is correct' },
                { id: 'opt-chem-56-2', text: 'Both Statement I and Statement II are correct' },
                { id: 'opt-chem-56-3', text: 'Statement I is correct but Statement II is incorrect', isCorrect: true },
                { id: 'opt-chem-56-4', text: 'Both Statement I and Statement II are incorrect' }
              ]
            },
            {
              id: 'q-chem-57',
              text: 'The compounds which give positive Fehling\'s test are : (A) ... (B) ... (C) ... (D) ... (E) ... (Refer to image). Choose the correct answer from the options given below :',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 6,
              options: [
                { id: 'opt-chem-57-1', text: '(A), (D) and (E) Only' },
                { id: 'opt-chem-57-2', text: '(C), (D) and (E) Only', isCorrect: true },
                { id: 'opt-chem-57-3', text: '(A), (C) and (D) Only' },
                { id: 'opt-chem-57-4', text: '(A), (B) and (C) Only' }
              ]
            },
            {
              id: 'q-chem-58',
              text: 'Which of the following electrolyte can be used to obtain H$_2$S$_2$O$_8$ by the process of electrolysis?',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 7,
              options: [
                { id: 'opt-chem-58-1', text: 'Dilute solution of sodium sulphate.' },
                { id: 'opt-chem-58-2', text: 'Acidified dilute solution of sodium sulphate.' },
                { id: 'opt-chem-58-3', text: 'Dilute solution of sulphuric acid' },
                { id: 'opt-chem-58-4', text: 'Concentrated solution of sulphuric acid', isCorrect: true }
              ]
            },
            {
              id: 'q-chem-59',
              text: 'Given below are two statements : Statement I : CH$_3$-O-CH$_2$-Cl will undergo S$_N$1 reaction though it is a primary halide. Statement II : CH$_3$-O-CH$_2$-Cl will not undergo S$_N$2 reaction very easily though it is a primary halide. In the light of the above statements, choose the most appropriate answer from the options given below :',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 8,
              options: [
                { id: 'opt-chem-59-1', text: 'Both Statement I and Statement II are incorrect' },
                { id: 'opt-chem-59-2', text: 'Both Statement I and Statement II are correct', isCorrect: true },
                { id: 'opt-chem-59-3', text: 'Statement I is incorrect but Statement II is correct' },
                { id: 'opt-chem-59-4', text: 'Statement I is correct but Statement II is incorrect' }
              ]
            },
            {
              id: 'q-chem-60',
              text: 'Which of the following acids is a vitamin?',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 9,
              options: [
                { id: 'opt-chem-60-1', text: 'Adipic acid' },
                { id: 'opt-chem-60-2', text: 'Ascorbic acid', isCorrect: true },
                { id: 'opt-chem-60-3', text: 'Saccharic acid' },
                { id: 'opt-chem-60-4', text: 'Aspartic acid' }
              ]
            },
            {
              id: 'q-chem-61',
              text: 'Match List-I with List-II. (A) Al$^{3+} <$ Mg$^{2+} <$ Na$^+ <$ F$^-$ (I) Ionisation Enthalpy. (B) B < C < O < N (II) Metallic character. (C) B < Al < Mg < K (III) Electronegativity. (D) Si < P < S < Cl (IV) Ionic radii.',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 10,
              options: [
                { id: 'opt-chem-61-1', text: '(A)-(IV), (B)-(I), (C)-(II), (D)-(III)', isCorrect: true },
                { id: 'opt-chem-61-2', text: '(A)-(IV), (B)-(I), (C)- (III), (D)-(II)' },
                { id: 'opt-chem-61-3', text: '(A)-(III), (B)-(IV), (C)- (II), (D)-(I)' },
                { id: 'opt-chem-61-4', text: '(A)-(II), (B)-(III), (C)-(IV), (D)-(I)' }
              ]
            },
            {
              id: 'q-chem-62',
              text: 'Which of the following statement is not true for radioactive decay?',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 11,
              options: [
                { id: 'opt-chem-62-1', text: 'Decay constant increases with increase in temperature.', isCorrect: true },
                { id: 'opt-chem-62-2', text: 'Amount of radioactive substance remained after three half lives is 1/8 th of original amount.' },
                { id: 'opt-chem-62-3', text: 'Decay constant does not depend upon temperature.' },
                { id: 'opt-chem-62-4', text: 'Half life is ln 2 times of 1/rate constant.' }
              ]
            },
            {
              id: 'q-chem-63',
              text: 'The products formed in the following reaction sequence are : (Refer to Image)',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 12,
              options: [
                { id: 'opt-chem-63-1', text: '...' },
                { id: 'opt-chem-63-2', text: '...' },
                { id: 'opt-chem-63-3', text: '...', isCorrect: true },
                { id: 'opt-chem-63-4', text: '...' }
              ]
            },
            {
              id: 'q-chem-64',
              text: 'How many different stereoisomers are possible for the given molecule? $CH_3-CH(OH)-CH=CH-CH_3$',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 13,
              options: [
                { id: 'opt-chem-64-1', text: '2' },
                { id: 'opt-chem-64-2', text: '1' },
                { id: 'opt-chem-64-3', text: '4', isCorrect: true },
                { id: 'opt-chem-64-4', text: '3' }
              ]
            },
            {
              id: 'q-chem-65',
              text: 'A vessel at 1000 K contains CO$_2$ with a pressure of 0.5 atm . Some of CO$_2$ is converted into CO on addition of graphite. If total pressure at equilibrium is 0.8 atm , then Kp is :',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 14,
              options: [
                { id: 'opt-chem-65-1', text: '1.8 atm', isCorrect: true },
                { id: 'opt-chem-65-2', text: '0.3 atm' },
                { id: 'opt-chem-65-3', text: '3 atm' },
                { id: 'opt-chem-65-4', text: '0.18 atm' }
              ]
            },
            {
              id: 'q-chem-66',
              text: 'A solution of aluminium chloride is electrolysed for 30 minutes using a current of 2 A . The amount of the aluminium deposited at the cathode is [Given : molar mass of aluminium and chlorine are 27 g mol$^{-1}$ and 35.5 g mol$^{-1}$ respectively. Faraday constant = 96500 Cmol$^{-1}$]',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 15,
              options: [
                { id: 'opt-chem-66-1', text: '1.660 g' },
                { id: 'opt-chem-66-2', text: '0.336 g', isCorrect: true },
                { id: 'opt-chem-66-3', text: '0.441 g' },
                { id: 'opt-chem-66-4', text: '1.007 g' }
              ]
            },
            {
              id: 'q-chem-67',
              text: 'The IUPAC name of the following compound is : (Refer to Image)',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 16,
              options: [
                { id: 'opt-chem-67-1', text: 'Methyl-6-carboxy-2,5-dimethylhexanoate.' },
                { id: 'opt-chem-67-2', text: '2-Carboxy-5-methoxycarbonylhexane.' },
                { id: 'opt-chem-67-3', text: '6-Methoxycarbonyl-2,5-dimethylhexanoic acid.', isCorrect: true },
                { id: 'opt-chem-67-4', text: 'Methyl-5-carboxy-2-methylhexanoate.' }
              ]
            },
            {
              id: 'q-chem-68',
              text: 'In which of the following complexes the CFSE, $\\Delta_o$ will be equal to zero?',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 17,
              options: [
                { id: 'opt-chem-68-1', text: '[Fe(en)$_3$]Cl$_3$' },
                { id: 'opt-chem-68-2', text: 'K$_4$[Fe(CN)$_6$]' },
                { id: 'opt-chem-68-3', text: '[Fe(NH$_3$)$_6$]Br$_2$' },
                { id: 'opt-chem-68-4', text: 'K$_3$[Fe(SCN)$_6$]', isCorrect: true }
              ]
            },
            {
              id: 'q-chem-69',
              text: 'Arrange the following solutions in order of their increasing boiling points. (i) $10^{-4}$M NaCl (ii) $10^{-4}$M Urea (iii) $10^{-3}$M NaCl (iv) $10^{-2}$M NaCl',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 18,
              options: [
                { id: 'opt-chem-69-1', text: '(i) < (ii) < (iii) < (iv)' },
                { id: 'opt-chem-69-2', text: '(iv) < (iii) < (i) < (ii)' },
                { id: 'opt-chem-69-3', text: '(ii) < (i) < (iii) < (iv)' },
                { id: 'opt-chem-69-4', text: '(ii) < (i) < (iii) < (iv)', isCorrect: true }
              ]
            },
            {
              id: 'q-chem-70',
              text: 'From the magnetic behaviour of [NiCl$_4$]$^{2-}$ (paramagnetic) and [Ni(CO)$_4$] (diamagnetic), choose the correct geometry and oxidation state.',
              type: QuestionType.MCQ,
              sectionId: 'sec-chem-a',
              subjectId: 'sub-chem',
              orderIndex: 19,
              options: [
                { id: 'opt-chem-70-1', text: '[NiCl$_4$]$^{2-}$ : Ni$^{II}$, tetrahedral [Ni(CO)$_4$] : Ni$^{II}$, square planar' },
                { id: 'opt-chem-70-2', text: '[NiCl$_4$]$^{2-}$ : Ni$^{II}$, square planar [Ni(CO)$_4$] : Ni(0), square planar' },
                { id: 'opt-chem-70-3', text: '[NiCl$_4$]$^{2-}$ : Ni$^{II}$, tetrahedral [Ni(CO)$_4$] : Ni(0), tetrahedral', isCorrect: true },
                { id: 'opt-chem-70-4', text: '[NiCl$_4$]$^{2-}$ : Ni(0), tetrahedral [Ni(CO)$_4$] : Ni(0), square planar' }
              ]
            }
          ]
        },
        {
          id: 'sec-chem-b',
          name: 'Section B',
          type: QuestionType.NUMERIC,
          subjectId: 'sub-chem',
          questions: [
            {
              id: 'q-chem-71',
              text: 'The number of molecules/ions that show linear geometry among the following is ______ SO$_2$, BeCl$_2$, CO$_2$, N$_3^-$, NO$_2$, F$_2$O, XeF$_2$, NO$_2^+$, I$_3^-$, O$_3$',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-chem-b',
              subjectId: 'sub-chem',
              orderIndex: 20,
              correctValue: 6
            },
            {
              id: 'q-chem-72',
              text: 'The molecule A changes into its isomeric form B by following a first order kinetics at a temperature of 1000 K . If the energy barrier with respect to reactant energy for such isomeric transformation is 191.48 kJ mol$^{-1}$ and the frequency factor is $10^{20}$, the time required for 50% molecules of A to become B is _________ picoseconds (nearest integer). [R = 8.314 J K$^{-1}$ mol$^{-1}$]',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-chem-b',
              subjectId: 'sub-chem',
              orderIndex: 21,
              correctValue: 69
            },
            {
              id: 'q-chem-73',
              text: 'Consider the following sequence of reactions : (Refer to Image). Molar mass of the product formed (A) is _______ gmol$^{-1}$.',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-chem-b',
              subjectId: 'sub-chem',
              orderIndex: 22,
              correctValue: 154
            },
            {
              id: 'q-chem-74',
              text: 'Some CO$_2$ gas was kept in a sealed container at a pressure of 1 atm and at 273 K . This entire amount of gas was later passed through an aqueous solution of Ca(OH)$_2$. The excess unreacted Ca(OH)$_2$ was later neutralized with 0.1 M of 40 mL HCl . If the volume of the sealed container of CO$_2$ was $x$, then $x$ is ________ cm$^3$ (nearest integer). [Given : The entire amount of CO$_2$( g) reacted with exactly half the initial amount of Ca(OH)$_2$ present in the aqueous solution.]',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-chem-b',
              subjectId: 'sub-chem',
              orderIndex: 23,
              correctValue: 45
            },
            {
              id: 'q-chem-75',
              text: 'In Carius method for estimation of halogens, 180 mg of an organic compound produced 143.5 mg of AgCl . The percentage composition of chlorine in the compound is _______ %. (Given : molar mass in gmol$^{-1}$ of Ag : 108, Cl : 35.5 )',
              type: QuestionType.NUMERIC,
              sectionId: 'sec-chem-b',
              subjectId: 'sub-chem',
              orderIndex: 24,
              correctValue: 20
            }
          ]
        }
      ]
    }
  ]
};