function replaceAt(str, i, char) {
  return str.substr(0, i) + char + str.substr(i + 1);
}
function swap(str, i1, i2) {
  return replaceAt(replaceAt(str, i1, str[i2]), i2, str[i1]);
}
function sort(str) {
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length - 1; j++) {
      if (str[i] < str[j]) {
        str = swap(str, i, j);
      }
    }
  }
  return str;
}

function getCount(str) {
  let vowelsCount = 0;
  const vowels = ["a", "e", "i", "o", "u"];
  for (let char of str) {
    if (vowels.includes(char)) {
      vowelsCount++;
    }
  }
  return vowelsCount;
}

function createWords(source = "") {
  source = source.split("");
  let reqCharCount = 5;

  const result = [];
  const sourceLen = source.length;

  reqCharCount = reqCharCount > sourceLen ? sourceLen : reqCharCount;

  const innerLoop = (prefix = [], done = [], index = 0) => {
    const prefixLen = prefix.length;

    for (let i = index; i < sourceLen; i++) {
      if (prefixLen > reqCharCount - 1) break;
      if (done.includes(i)) continue;

      const item = source[i];
      const newItem = [...prefix, item];

      if (prefixLen === reqCharCount - 1) {
        const word = newItem.join("");
        if (getCount(word) <= 2 && word.length === reqCharCount) {
          result.push(word);
        }
      }

      if (prefixLen < reqCharCount - 1) {
        innerLoop(newItem, [...done, i], index++);
      }
    }
  };

  if (source.length) {
    if (reqCharCount > sourceLen) {
      return "Unable to process the string";
    }

    innerLoop();
  }
  if (!result.length) {
    return "Unable to process the string";
  }

  return result;
}

function doTheTaskWithSorting(str = "") {
  return createWords(sort(str));
}

function doTheTaskWithoutSorting(str1 = "", str2 = "") {
  return createWords(str1 + str2);
}
