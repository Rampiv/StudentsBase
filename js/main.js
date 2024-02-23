// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

(function() {
  // Элементы базы данных
let surname = document.getElementById('surname');
let name = document.getElementById('name');
let middleName = document.getElementById('middleName');
let birthday = document.getElementById('birthday');
let year = document.getElementById('year');
let faculty = document.getElementById('faculty');
let tableBase = document.getElementById('tableBase');
// Элементы добавления студента
let inputSurname = document.getElementById('inputSurmane');
let inputName = document.getElementById('inputName');
let inputMiddleName = document.getElementById('inputMiddleName');
let inputBirthday = document.getElementById('inputBirthday');
let inputYear = document.getElementById('inputYear');
let inputFaculty = document.getElementById('inputFaculty');
let inputBtn = document.getElementById('inputBtn');
// Элементы фильтра студентов
let surnameFilter = document.getElementById('surnameFilter');
let nameFilter = document.getElementById('nameFilter');
let middleNameFilter = document.getElementById('middleNameFilter');
let yearFilter = document.getElementById('yearFilter');
let yearEndFilter = document.getElementById('yearEndFilter');
let facultyFilter = document.getElementById('facultyFilter');
// Кнопки сортировки
let surnameSort = document.getElementById('btnSortSurname');
let nameSort = document.getElementById('btnSortName');
let middleNameSort = document.getElementById('btnSortMiddleName');
let birthdaySort = document.getElementById('btnSortBirthday');
let yearSort = document.getElementById('btnSortYear');
let facultySort = document.getElementById('btnSortFaculty');




// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.
const studentsList = [
  // Добавьте сюда объекты студентов
  {
    surname: 'Петров',
    name: 'Иван',
    middleName: 'Романович',
    birthday: `30.11.1997`,
    year: `01.09.2020`,
    faculty: 'IT'
  },

  {
    surname: 'Петров',
    name: 'Иоан',
    middleName: 'Романович',
    birthday: `30.11.1997`,
    year: `01.09.2020`,
    faculty: 'IT'
  },

  {
    surname: 'Ябида',
    name: 'Корябида',
    middleName: 'Огурецович',
    birthday: `01.02.2003`,
    year: `01.09.2019`,
    faculty: 'Куда IT'
  },

  {
    surname: 'Аааааа',
    name: 'Аааа',
    middleName: 'Аааа',
    birthday: `17.04.2001`,
    year: `01.09.2021`,
    faculty: 'Туда IT'
  },

  {
    surname: 'Устюг',
    name: 'Лево',
    middleName: 'Правович',
    birthday: `04.09.1990`,
    year: `01.09.2007`,
    faculty: 'Философия мемов'
  },

]

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.
function getStudentItem() {
  studentObj = {};
  studentObj.surname = capFirst(inputSurname.value);;
  studentObj.name = capFirst(inputName.value);
  studentObj.middleName = capFirst(inputMiddleName.value);
  studentObj.birthday = inputBirthday.value.split('-').reverse().join('.');
  studentObj.year = inputYear.value.split('-').reverse().join('.');
  studentObj.faculty = inputFaculty.value;

  studentsList.push(studentObj);
  clearInputGetStudentItem();
}

// Функция выравнивания букв
function capFirst(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

// ф-я очищения инпутов при добавлении студента
function clearInputGetStudentItem() {
  inputSurname.value = '';
  inputName.value = '';
  inputMiddleName.value = '';
  inputBirthday.value = '';
  inputYear.value = '';
  inputFaculty.value = '';
}

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

// Функция очистки базы
function deleteChild() {
  let childNodes = tableBase.querySelectorAll('.tr-student')

  for (let i = 0, j = childNodes.length; i < j; i++) {
    let childNode = childNodes[i]
    tableBase.removeChild(childNode)
  }
}

// Функция рендера
function renderStudentsTable(Array) {
  for (obj of Array) {
    let tr = document.createElement('tr');
    let surname = document.createElement('td');
    let name = document.createElement('td');
    let middleName = document.createElement('td');
    let birthday = document.createElement('td');
    let year = document.createElement('td');
    let faculty = document.createElement('td');
    let btnDelete = document.createElement('btn');

    tr.classList.add('tr-student');
    surname.classList.add('table__text');
    name.classList.add('table__text');
    middleName.classList.add('table__text');
    birthday.classList.add('table__text');
    year.classList.add('table__text');
    faculty.classList.add('table__text');

    surname.textContent = obj.surname;
    name.textContent = obj.name;
    middleName.textContent = obj.middleName;
    birthday.textContent = obj.birthday + ` ` + `Полных лет: ${age(obj.birthday)}`;
    year.textContent = titleLearn(obj.year);
    faculty.textContent = obj.faculty;

    tableBase.append(tr);
    tr.append(surname, name, middleName, birthday, year, faculty);
  }
}

// Функция высчитывания возраста
function age(str) {
  let [date, month, year] = str.match(/(\d+)/g);
  --month;
  let now = new Date;
  let nowYear = now.getFullYear(),
    nowMonth = now.getMonth(),
    nowDate = now.getDate();
  return nowYear - year - (0 > (nowMonth - month || nowDate - date))
};

// Функция высчитывания года обучения
function titleLearn(str) {
  let [date, month, year] = str.match(/(\d+)/g);
  --month;
  let now = new Date;
  let nowYear = now.getFullYear(),
    nowMonth = now.getMonth(),
    nowDate = now.getDate();
  let rate = nowYear - year - (0 > (nowMonth - 9 || nowDate - 1))
  rate = ++rate > 4 ? 'закончил' : `${rate} курс`
  let range = `${year} - ${+year + 4} (${rate})`;
  return range;
}

renderStudentsTable(studentsList);

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
inputBtn.addEventListener('click', function (e) {
  e.preventDefault();
  // Добавляю фильтр для ввода дат
  let epochBirthday = Date.parse(inputBirthday.value);
  let minBirthday = Date.parse(`1900-01-01`)
  let epochYear = Date.parse(inputYear.value);
  let minYear = Date.parse(`2000-01-01`);
  let now = Math.floor(new Date().getTime());

  if (!inputSurname.value.trim() || !inputName.value.trim()
    || !inputMiddleName.value.trim() || !inputBirthday.value.trim()
    || !inputYear.value.trim() || !inputFaculty.value.trim()) {
    alert('Вы ввели не все данные')
  } else if (epochBirthday <= minBirthday || epochBirthday >= now) {
    alert('Вы ввели некорректную дату рождения')
  } else if (epochYear <= minYear || epochYear > now) {
    alert('Вы ввели некорректную дату поступения')
  } else {
    getStudentItem();
    deleteChild();
    renderStudentsTable(studentsList);
  }
})

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
let isAscending = true;

function sortArray(criteria) {
  return studentsList.sort(function (a, b) {
    let x = a[criteria]; let y = b[criteria];
    if (isAscending) {
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    } else {
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }
  });
}

// Добавляю сортировку для каждой кнопки
surnameSort.addEventListener('click', function (e) {
  e.preventDefault();
  sortArray('surname');
  isAscending = !isAscending;
  deleteChild();
  renderStudentsTable(studentsList);
})

nameSort.addEventListener('click', function (e) {
  e.preventDefault();
  sortArray('name');
  isAscending = !isAscending;
  deleteChild();
  renderStudentsTable(studentsList);
})

middleNameSort.addEventListener('click', function (e) {
  e.preventDefault();
  sortArray('middleName');
  isAscending = !isAscending;
  deleteChild();
  renderStudentsTable(studentsList);
})

birthdaySort.addEventListener('click', function (e) {
  e.preventDefault();
  function sortArray() {
    return studentsList.sort(function (a, b) {
      let x = a["birthday"].split('.').reverse().join('.');
      let y = b["birthday"].split('.').reverse().join('.');
      if (isAscending) {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      } else {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }
  sortArray()
  isAscending = !isAscending;
  deleteChild();
  renderStudentsTable(studentsList);
})

yearSort.addEventListener('click', function (e) {
  e.preventDefault();
  sortArray(`year`);
  isAscending = !isAscending;
  deleteChild();
  renderStudentsTable(studentsList);
})

facultySort.addEventListener('click', function (e) {
  e.preventDefault();
  sortArray('faculty');
  isAscending = !isAscending;
  deleteChild();
  renderStudentsTable(studentsList);
})

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

document.getElementById('formFilter').addEventListener("input", () => greatFilter());

function greatFilter() {
  let newList = studentsList.slice(0),
    str = '';

  if (surnameFilter.value) {
    str = surnameFilter.value.trim().toLowerCase()
    newList = newList.filter(({
      surname
    }) => surname.toLowerCase().includes(str))
  }

  if (nameFilter.value) {
    str = nameFilter.value.trim().toLowerCase()
    newList = newList.filter(({
      name
    }) => name.toLowerCase().includes(str))
  }

  if (middleNameFilter.value) {
    str = middleNameFilter.value.trim().toLowerCase()
    newList = newList.filter(({
      middleName
    }) => middleName.toLowerCase().includes(str))
  }

  if (yearFilter.value) {
    str = yearFilter.value.trim()
    newList = newList.filter(({
      year
    }) => year.slice(-4) == str)
  }

  if (yearEndFilter.value) {
    str = yearEndFilter.value.trim()
    newList = newList.filter(({
      year
    }) => +year.slice(-4) + 4 == str)
  }

  if (facultyFilter.value) {
    str = facultyFilter.value.trim().toLowerCase()
    newList = newList.filter(({
      faculty
    }) => faculty.toLowerCase().includes(str))
  }

  deleteChild();
  renderStudentsTable(newList);
}

// Кнопка обновления фильтра
document.getElementById('btnRefrash').addEventListener('click', function (e) {
  e.preventDefault();
  surnameFilter.value = '';
  nameFilter.value = '';
  middleNameFilter.value = '';
  yearFilter.value = '';
  yearEndFilter.value = '';
  facultyFilter.value = '';
  deleteChild();
  renderStudentsTable(studentsList);
});

//конец самовызывающейся функции
})();
